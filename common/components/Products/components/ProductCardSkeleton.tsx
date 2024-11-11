// ProductCardSkeleton.tsx

import { FC } from 'react';
import { Card, CardContent, CardActions, Skeleton, Stack } from '@mui/material';

const ProductCardSkeleton: FC = () => {
  return (
    <Card data-testid="product-card-skeleton">
      <Skeleton
        data-testid="skeleton-image"
        data-variant="rectangular"
        variant="rectangular"
        height={200}
      />
      <CardContent>
        <Skeleton
          data-testid="skeleton-text"
          data-variant="text"
          variant="text"
          width="60%"
          height={28}
        />
        <Skeleton
          data-testid="skeleton-text"
          data-variant="text"
          variant="text"
          width="80%"
        />
        <Skeleton
          data-testid="skeleton-text"
          data-variant="text"
          variant="text"
          width="40%"
        />
        <Stack data-testid="skeleton-stack" direction="row" spacing={1} mt={1}>
          <Skeleton
            data-testid="skeleton-circular"
            data-variant="circular"
            variant="circular"
            width={20}
            height={20}
          />
          <Skeleton
            data-testid="skeleton-circular"
            data-variant="circular"
            variant="circular"
            width={20}
            height={20}
          />
          <Skeleton
            data-testid="skeleton-circular"
            data-variant="circular"
            variant="circular"
            width={20}
            height={20}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Skeleton
          data-testid="skeleton-action"
          data-variant="rectangular"
          variant="rectangular"
          width="100%"
          height={36}
        />
      </CardActions>
    </Card>
  );
};

export default ProductCardSkeleton;
