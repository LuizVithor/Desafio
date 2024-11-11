import {
  Typography,
  Stack,
  Divider,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  Rating,
} from '@mui/material';
import { parseISO } from 'date-fns';
import Barcode from 'react-barcode';
import { product } from '../controller';

interface ProductDetailsProps {
  product: product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1" color="textSecondary">
        {product.description}
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Informações Gerais</Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="SKU" secondary={product.sku} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Marca" secondary={product.brand || 'N/A'} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Categoria" secondary={product.category} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Peso" secondary={`${product.weight} kg`} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Dimensões"
                secondary={`${product.dimensions.width} x ${product.dimensions.depth} x ${product.dimensions.height} cm`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Quantidade Mínima de Pedido"
                secondary={product.minimumOrderQuantity}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Detalhes Adicionais</Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Preço"
                secondary={`R$ ${product.price.toFixed(2)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Desconto"
                secondary={`${product.discountPercentage}%`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Disponibilidade"
                secondary={product.availabilityStatus}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Estoque" secondary={product.stock} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Política de Devolução"
                secondary={product.returnPolicy}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Garantia"
                secondary={product.warrantyInformation}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Informações de Envio"
                secondary={product.shippingInformation}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Divider />
      <Typography variant="h6">Tags</Typography>
      <Stack direction="row" spacing={1}>
        {product.tags?.map((tag, index) => (
          <Chip key={index} label={tag} variant="outlined" />
        ))}
      </Stack>
      <Divider />
      <Typography variant="h6">Avaliações</Typography>
      {(product.reviews?.length || 0) > 0 ? (
        product.reviews?.map((review, index) => (
          <Stack key={index} spacing={1} mb={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="subtitle2">
                {review.reviewerName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ({parseISO(review.date).toLocaleDateString()})
              </Typography>
            </Stack>
            <Rating value={review.rating} readOnly size="small" />
            <Typography variant="body2">{review.comment}</Typography>
          </Stack>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          Nenhuma avaliação disponível.
        </Typography>
      )}
      <Divider />
      <Typography variant="h6">Meta Informações</Typography>
      <List dense>
        <ListItem>
          <ListItemText primary="Código QR" />
        </ListItem>
        <Stack alignItems="start" mb={2} pl={2}>
          {product.meta?.qrCode ? (
            <img
              src={product.meta.qrCode}
              alt="Código QR"
              style={{ width: '128px', height: '128px' }}
            />
          ) : (
            <Typography variant="body2" color="textSecondary">
              Código QR não disponível.
            </Typography>
          )}
        </Stack>
        <ListItem>
          <ListItemText primary="Código de Barras" />
        </ListItem>
        <Stack alignItems="start" mb={2} pl={2} data-testid={"barcode"}>
          {product.meta?.barcode ? (
            <Barcode data-testid={"barcode"} value={product.meta.barcode} height={80} />
          ) : (
            <Typography variant="body2" color="textSecondary">
              Código de barras não disponível.
            </Typography>
          )}
        </Stack>
        <ListItem>
          <ListItemText
            primary="Criado em"
            secondary={
              product.meta?.createdAt
                ? parseISO(product.meta.createdAt).toLocaleDateString()
                : new Date().toLocaleDateString()
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Atualizado em"
            secondary={
              product.meta?.updatedAt
                ? parseISO(product.meta.updatedAt).toLocaleDateString()
                : new Date().toLocaleDateString()
            }
          />
        </ListItem>
      </List>
    </Stack>
  );
};

export default ProductDetails;
