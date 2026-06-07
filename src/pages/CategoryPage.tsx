import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import CoffeeBeanDecor from '../components/CoffeeBeanDecor';
import { getProductsByCategory, CATEGORIES } from '../data/products';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const decoded = category ? decodeURIComponent(category) : '';
  const products = getProductsByCategory(decoded);

  return (
    <div style={styles.page}>
      <CoffeeBeanDecor count={6} />
      <div style={styles.container}>
        <Header title={decoded} showBack />

        {/* Filter chips */}
        <div style={styles.filterScroll}>
          {CATEGORIES.map((cat) => {
            const isActive = cat === decoded;
            return (
              <button
                key={cat}
                style={{
                  ...styles.filterChip,
                  background: isActive ? 'var(--yellow)' : 'var(--black-light)',
                  color: isActive ? 'var(--black)' : '#ccc',
                  border: isActive ? '1px solid var(--yellow)' : '1px solid rgba(255,215,0,0.2)',
                }}
                onClick={() => navigate(`/shop/${encodeURIComponent(cat)}`)}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <p style={styles.count}>{products.length} products in {decoded}</p>

        <div style={styles.grid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {products.length === 0 && (
          <div style={styles.empty}>
            <p style={styles.emptyText}>No products in this category yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'var(--black)', position: 'relative' },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '16px 16px 100px',
    position: 'relative',
    zIndex: 1,
  },
  filterScroll: {
    display: 'flex',
    gap: 8,
    overflowX: 'auto',
    paddingBottom: 8,
    marginBottom: 12,
    scrollbarWidth: 'none',
  },
  filterChip: {
    flexShrink: 0,
    padding: '6px 14px',
    borderRadius: 20,
    fontFamily: 'var(--font-body)',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  count: {
    fontFamily: 'var(--font-body)',
    fontSize: 12,
    color: 'var(--gray)',
    marginBottom: 12,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  },
  empty: { textAlign: 'center', padding: '40px 0' },
  emptyText: { fontFamily: 'var(--font-body)', color: 'var(--gray)' },
};
