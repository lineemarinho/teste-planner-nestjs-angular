import {
  ArgumentsHost,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AllExceptionsFilter } from './http-exception.filter';

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let host: ArgumentsHost;

  beforeEach(() => {
    filter = new AllExceptionsFilter();
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    host = {
      switchToHttp: () => ({
        getResponse: () => ({ status: statusMock }),
        getRequest: () => ({ method: 'GET', originalUrl: '/recipes/999' }),
      }),
    } as unknown as ArgumentsHost;
  });

  it('formats a NotFoundException with its status and message', () => {
    filter.catch(new NotFoundException('Recipe with id 999 not found'), host);

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 404,
        message: 'Recipe with id 999 not found',
        error: 'Not Found',
        path: '/recipes/999',
      }),
    );
  });

  it('preserves validation error arrays from BadRequestException', () => {
    filter.catch(
      new BadRequestException({
        message: ['title should not be empty'],
        error: 'Bad Request',
      }),
      host,
    );

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: ['title should not be empty'],
      }),
    );
  });

  it('maps unknown errors to a generic 500 without leaking internals', () => {
    filter.catch(new Error('database connection refused'), host);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 500,
        message: 'Internal server error',
        error: 'InternalServerError',
      }),
    );
  });
});
