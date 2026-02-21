// Standard API Response Utilities
import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  meta?: {
    total?: number;
    hasMore?: boolean;
    limit?: number;
    skip?: number;
  };
  message?: string;
  code?: string;
  documentation_url?: string;
}

export function successResponse<T>(
  data: T,
  meta?: ApiResponse['meta']
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    ...(meta && { meta }),
  });
}

export function errorResponse(
  message: string,
  status: number = 400,
  code?: string
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      ...(code && { code }),
      ...(code && { documentation_url: `https://shopmonkey.dev/error/${code}` }),
    },
    { status }
  );
}

export function createdResponse<T>(data: T): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: 201 }
  );
}

export function acceptedResponse(): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: true,
      message: 'Request accepted for processing',
    },
    { status: 202 }
  );
}

export function notFoundResponse(resource: string): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message: `${resource} not found`,
      code: 'API-404',
    },
    { status: 404 }
  );
}

export function unauthorizedResponse(): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message: 'Unauthorized. Valid API token required.',
      code: 'API-401',
    },
    { status: 401 }
  );
}

export function forbiddenResponse(): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message: 'Forbidden. Insufficient permissions.',
      code: 'API-403',
    },
    { status: 403 }
  );
}

export function rateLimitResponse(): NextResponse<ApiResponse> {
  const response = NextResponse.json(
    {
      success: false,
      message: 'Rate limit exceeded. Try again later.',
      code: 'API-429',
    },
    { status: 429 }
  );
  
  response.headers.set('x-ratelimit-limit', '5000');
  response.headers.set('x-ratelimit-remaining', '0');
  response.headers.set('x-ratelimit-reset', String(Math.floor(Date.now() / 1000) + 3600));
  
  return response;
}

export function serverErrorResponse(error?: any): NextResponse<ApiResponse> {
  console.error('Server error:', error);
  return NextResponse.json(
    {
      success: false,
      message: 'Internal server error',
      code: 'API-500',
    },
    { status: 500 }
  );
}
