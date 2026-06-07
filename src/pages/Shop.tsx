import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import CoffeeBeanDecor from '../components/CoffeeBeanDecor';
import { products, CATEGORIES } from '../data/products';

export default function Shop() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = !activeCategory || p.category === activeCategory;
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <div style={styles.page}>
      <CoffeeBeanDecor count={6} />
      <div style={styles.container}>
        <Header title="Market" />

        {/* Fresh daily banner */}
        <div style={styles.freshBanner}>
          <span style={styles.blinkDot} />
          <span style={styles.freshText}>Injera &amp; Prepared Foods Made Fresh Daily</span>
        </div>

        {/* Search */}
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            style={styles.searchInput}
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button style={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
          )}
        </div>

        {/* Category filters */}
        <div style={styles.filterScroll}>
          <button
            style={{
              ...styles.filterChip,
              background: !activeCategory ? 'var(--yellow)' : 'var(--black-light)',
              color: !activeCategory ? 'var(--black)' : '#ccc',
              border: !activeCategory ? '1px solid var(--yellow)' : '1px solid rgba(255,215,0,0.2)',
            }}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                style={{
                  ...styles.filterChip,
                  background: isActive ? 'var(--yellow)' : 'var(--black-light)',
                  color: isActive ? 'var(--black)' : '#ccc',
                  border: isActive ? '1px solid var(--yellow)' : '1px solid rgba(255,215,0,0.2)',
                }}
                onClick={() => {
                  if (isActive) setActiveCategory(null);
                  else navigate(`/shop/${encodeURIComponent(cat)}`);
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p style={styles.resultsCount}>{filtered.length} products</p>

        {/* Grid */}
        <div style={styles.grid}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={styles.empty}>
            <p style={styles.emptyText}>No products found</p>
            <button
              style={styles.resetBtn}
              onClick={() => { setSearch(''); setActiveCategory(null); }}
            >
              Clear Filters
            </button>
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
  freshBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'rgba(255,215,0,0.05)',
    border: '1px solid rgba(255,215,0,0.2)',
    borderRadius: 'var(--radius)',
    padding: '8px 12px',
    marginBottom: 12,
  },
  blinkDot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: 'var(--yellow)',
    animation: 'blink-yellow 1s infinite',
    display: 'inline-block',
    flexShrink: 0,
  },
  freshText: {
    fontFamily: 'var(--font-body)',
    fontSize: 12,
    color: 'var(--yellow)',
    fontWeight: 600,
  },
  searchWrap: {
    display: 'flex',
    alignItems: 'center',
    background: 'var(--black-light)',
    border: '1px solid rgba(255,215,0,0.2)',
    borderRadius: 'var(--radius)',
    padding: '0 12px',
    marginBottom: 12,
  },
  searchIcon: { fontSize: 14, marginRight: 8, opacity: 0.6 },
  searchInput: {
    flex: 1,
    background: 'none',
    border: 'none',
    outline: 'none',
    color: 'var(--white)',
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    padding: '12px 0',
  },
  clearBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--gray)',
    cursor: 'pointer',
    fontSize: 14,
    padding: 4,
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
  resultsCount: {
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
  empty: {
    textAlign: 'center',
    padding: '40px 0',
  },
  emptyText: {
    fontFamily: 'var(--font-body)',
    color: 'var(--gray)',
    marginBottom: 12,
  },
  resetBtn: {
    background: 'none',
    border: '1px solid var(--yellow)',
    color: 'var(--yellow)',
    padding: '8px 20px',
    borderRadius: 'var(--radius)',
    cursor: 'pointer',
    fontFamily: 'var(--font-heading)',
    fontSize: 12,
  },
};
