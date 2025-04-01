import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Extend Express Response type to include our custom property
interface ResponseWithBody extends Response {
  responseBody?: any;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: ResponseWithBody, next: NextFunction) {
    const { method, originalUrl, ip, body } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    // Log request
    this.logger.log(
      `[${new Date().toISOString()}] ${method} ${originalUrl} - IP: ${ip} - User-Agent: ${userAgent}`
    );

    // Log request body (excluding sensitive data)
    if (body && typeof body === 'object' && Object.keys(body).length > 0) {
      const sanitizedBody = this.sanitizeBody(body);
      this.logger.debug(`Request Body: ${JSON.stringify(sanitizedBody)}`);
    }

    // Capture response
    const oldSend = res.send;
    res.send = function (body) {
      res.responseBody = body;
      return oldSend.call(this, body);
    };

    // Log response when finished
    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;
      const responseSize = res.get('content-length') || 0;

      // Log response
      this.logger.log(
        `[${new Date().toISOString()}] ${method} ${originalUrl} ${statusCode} - ${responseTime}ms - ${responseSize} bytes`
      );

      // Log response body for non-200 responses (excluding sensitive data)
      if (statusCode >= 400 && res.responseBody) {
        const sanitizedResponse = this.sanitizeBody(res.responseBody);
        this.logger.error(`Response Body: ${JSON.stringify(sanitizedResponse)}`);
      }
    });

    next();
  }

  private sanitizeBody(body: any): any {
    const sensitiveFields = ['password', 'token', 'access_token', 'refresh_token'];
    const sanitized = { ...body };

    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }
} 