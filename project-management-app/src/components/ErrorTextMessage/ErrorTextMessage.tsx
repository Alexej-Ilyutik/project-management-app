import React from 'react';

interface IErrorMessageProps {
  error: string | undefined;
}

export function ErrorTextMessage({ error }: IErrorMessageProps) {
  return (
    <div data-testid="ErrorMessage" className="text-danger text-center">
      {error}
    </div>
  );
}
