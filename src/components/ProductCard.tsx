import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

interface Props {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: Props) {
  const navigate = useNavigate();
  const { addToCart: ctxAddToCart } = useCart();
  const addToCart = onAddToCart ?? ctxAddToCart;
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div style={styles.card}>
      <div
        style={styles.imageBox}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <span style={styles.emoji}>{product.emoji}</span>
        {product.isFresh && (
          <span style={styles.freshBadge}>
            <span style={styles.freshDot} />
            FRESH
          </span>
        )}
        <button
          style={{ ...styles.heartBtn, color: wishlisted ? '#FF4455' : 'rgba(255,255,255,0.4)' }}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
        >
          {wishlisted ? '❤️' : '🤍'}
        </button>
      </div>
      <div style={styles.info} onClick={() => navigate(`/product/${product.id}`)}>
        <p style={styles.name}>{product.name}</p>
        <p style={styles.price}>${product.price.toFixed(2)}</p>
      </div>
      <button
        style={styles.addBtn}
        onClick={() => addToCart(product)}
      >
        + Add to Cart
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: 'var(--black-light)',
    border: '1px solid rgba(255,215,0,0.1)',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  imageBox: {
    background: 'linear-gradient(135deg, #1a1500 0%, #2a2200 50%, #1a1500 100%)',
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderBottom: '1px solid rgba(255,215,0,0.08)',
  },
  emoji: {
    fontSize: 40,
  },
  freshBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    background: 'rgba(0,0,0,0.7)',
    border: '1px solid var(--green)',
    color: 'var(--green)',
    fontSize: 9,
    fontFamily: 'var(--font-heading)',
    letterSpacing: 1,
    padding: '2px 6px',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  freshDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'var(--green)',
    animation: 'pulse-green 1.5s infinite',
    display: 'inline-block',
  },
  heartBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    background: 'rgba(0,0,0,0.5)',
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    padding: 4,
    borderRadius: 4,
    lineHeight: 1,
  },
  info: {
    padding: '8px 10px 4px',
    flexGrow: 1,
  },
  name: {
    fontSize: 13,
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    color: 'var(--white)',
    marginBottom: 4,
    lineHeight: 1.3,
  },
  price: {
    fontSize: 15,
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    color: 'var(--yellow)',
  },
  addBtn: {
    margin: '8px 10px 10px',
    background: 'rgba(255,215,0,0.1)',
    border: '1px solid rgba(255,215,0,0.3)',
    color: 'var(--yellow)',
    fontFamily: 'var(--font-heading)',
    fontSize: 11,
    letterSpacing: 0.5,
    padding: '8px 0',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.2s',
    textTransform: 'uppercase',
  },
};
