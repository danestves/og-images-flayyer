// Dependencies
import * as React from 'react';
import clsx from 'clsx';

export const Layer = React.forwardRef(
  (
    {className, ...props}: React.ComponentProps<'div'>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => (
    <div
      {...props}
      ref={ref}
      className={clsx('absolute inset-0 w-full h-full', className)}
    />
  ),
);

export default Layer;
