import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { categories, products } from './catalog.js';

const StoreContext = createContext(null);
const phone = '+8801884271997';
const displayPhone = '01884-271997';
const address = '৫ম তলা, ইনফিনিটি বিল্ডিং, মিরপুর ১২, ঢাকা, বাংলাদেশ';
const facebook = 'https://www.facebook.com/profile.php?id=61592706817986';
const formatPrice = amount => `৳${new Intl.NumberFormat('bn-BD').format(amount)}`;

function Icon({ name, size = 19 }) {
  const paths = {
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6"/></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3.1a2 2 0 0 1-.6 1.7L7.7 9.8a16 16 0 0 0 6.5 6.5l1.3-1.3a2 2 0 0 1 1.7-.6l3.1.5a2 2 0 0 1 1.7 2Z"/>,
    home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z"/>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    minus: <path d="M5 12h14"/>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    gift: <><path d="M20 12v9H4v-9M2 7h20v5H2zM12 7v14"/><path d="M12 7H7.5a2.5 2.5 0 1 1 2.4-3.2L12 7Zm0 0h4.5a2.5 2.5 0 1 0-2.4-3.2L12 7Z"/></>,
    toy: <><path d="m12 3 2.3 5.3 5.7.5-4.3 3.8 1.3 5.6-5-3-5 3 1.3-5.6L4 8.8l5.7-.5L12 3Z"/><circle cx="12" cy="12" r="1"/></>,
    textile: <><path d="m5 4 14 0v16H5zM8 8h8M8 12h8M8 16h5"/><path d="M8 4v2m4-2v2m4-2v2"/></>,
    jewelry: <><path d="m12 3 8 7-8 11-8-11 8-7Z"/><path d="M4 10h16M9 4l-2 6 5 11 5-11-2-6"/></>,
    gadget: <><rect x="6" y="3" width="12" height="18" rx="2.5"/><path d="M10 6h4m-3 12h2"/></>,
    fashion: <><path d="M8 4a4 4 0 0 0 8 0M12 8 5 11l2 4 3-1v6h10v-6l3 1 2-4-7-3" transform="translate(-3)"/></>,
    sparkle: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></>,
    tag: <><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V4h9l8.6 6.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="8" r="1"/></>,
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.6 8.6 0 0 1-4-.9L4 20l1.2-3.5A7.1 7.1 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.1 8 7Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function StoreProvider({ children }) {
  const [notice, setNotice] = useState('');
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nk-cart') || '[]'); } catch { return []; }
  });
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nk-favorites') || '[]'); } catch { return []; }
  });
  useEffect(() => localStorage.setItem('nk-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('nk-favorites', JSON.stringify(favorites)), [favorites]);
  const value = useMemo(() => ({
    cart,
    favorites,
    notice,
    addToCart: id => {
      setCart(current => current.includes(id) ? current : [...current, id]);
      setNotice('পণ্যটি আপনার ব্যাগে যোগ হয়েছে');
      window.clearTimeout(window.notunKichuNoticeTimer);
      window.notunKichuNoticeTimer = window.setTimeout(() => setNotice(''), 2200);
    },
    removeFromCart: id => setCart(current => current.filter(item => item !== id)),
    toggleFavorite: id => setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]),
  }), [cart, favorites, notice]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
const useStore = () => useContext(StoreContext);

function Header() {
  const { cart } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const submitSearch = event => {
    event.preventDefault();
    navigate(`/shop${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''}`);
    setSearchOpen(false);
  };
  return <>
    <div className="announcement">নতুন কিছু খুঁজছেন? <span>·</span> পণ্যের তথ্য জানতে আমাদের সাথে যোগাযোগ করুন</div>
    <header className="site-header"><div className="wrap header-row">
      <Link className="brand" to="/" aria-label="Notun Kichu হোম"><img src="/assets/notun-kichu-logo.png" alt="Notun Kichu লোগো"/><span className="brand-copy">notun kichu<small>প্রতিদিনের জীবনে নতুন কিছু</small></span></Link>
      <nav className="desktop-nav" aria-label="প্রধান নেভিগেশন">
        <NavLink to="/" end>হোম</NavLink><NavLink to="/shop">সব পণ্য</NavLink><NavLink to="/about">আমাদের কথা</NavLink><NavLink to="/contact">যোগাযোগ</NavLink>
      </nav>
      <div className="header-actions">
        <button className="icon-button" aria-label="পণ্য খুঁজুন" onClick={() => setSearchOpen(true)}><Icon name="search"/></button>
        <Link className="icon-button bag-link" to="/cart" aria-label={`কার্ট, ${cart.length}টি পণ্য`}><Icon name="bag"/><span className="cart-badge">{cart.length}</span></Link>
        <a className="button button-small header-call" href={`tel:${phone}`}><Icon name="phone" size={16}/> <span>কল করুন</span></a>
      </div>
    </div></header>
    {searchOpen && <div className="search-shade" role="presentation" onMouseDown={event => event.target === event.currentTarget && setSearchOpen(false)}><form className="search-dialog" onSubmit={submitSearch}><div className="search-form"><Icon name="search"/><input autoFocus value={search} onChange={event => setSearch(event.target.value)} placeholder="পণ্যের নাম লিখে খুঁজুন" aria-label="পণ্যের নাম"/><button type="button" className="icon-button" aria-label="বন্ধ করুন" onClick={() => setSearchOpen(false)}><Icon name="close"/></button></div><p>যেমন: মগ, খেলনা, ম্যাট</p></form></div>}
  </>;
}

function Footer() {
  return <footer className="site-footer"><div className="wrap footer-grid">
    <div className="footer-brand"><Link className="brand footer-logo" to="/"><img src="/assets/notun-kichu-logo.png" alt="Notun Kichu লোগো"/><span className="brand-copy">notun kichu<small>প্রতিদিনের জীবনে নতুন কিছু</small></span></Link><p>চীন থেকে বেছে আনা ইউনিক, সুন্দর ও দরকারি সব পণ্য—আপনার প্রতিদিনের জীবনে নতুন কিছু।</p><a className="social-link" href={facebook} target="_blank" rel="noreferrer">Facebook-এ আমাদের দেখুন <Icon name="arrow" size={15}/></a></div>
    <div className="footer-column"><h3>ঘুরে দেখুন</h3><Link to="/shop">সব পণ্য</Link><Link to="/about">আমাদের কথা</Link><Link to="/contact">যোগাযোগ</Link><Link to="/cart">আপনার ব্যাগ</Link></div>
    <div className="footer-column"><h3>কেনাকাটার সহায়তা</h3><a href={`tel:${phone}`}>অর্ডার ও পণ্যের তথ্য</a><a href={`tel:${phone}`}>ডেলিভারি জানতে</a><a href={`mailto:notunkichu2k26@gmail.com`}>ইমেইল করুন</a><Link to="/contact">সাধারণ জিজ্ঞাসা</Link></div>
    <div className="footer-column footer-contact"><h3>আমাদের ঠিকানা</h3><a href={`tel:${phone}`}><Icon name="phone" size={16}/><span>{displayPhone}<br/>+880 1884-271997</span></a><a href="mailto:notunkichu2k26@gmail.com"><Icon name="mail" size={16}/><span>notunkichu2k26@gmail.com</span></a><a href="https://maps.google.com/?q=5th+Floor+Infinity+Building+Mirpur+12+Dhaka" target="_blank" rel="noreferrer"><Icon name="pin" size={16}/><span>{address}</span></a></div>
  </div><div className="wrap copyright"><span>© {new Date().getFullYear()} Notun Kichu. সর্বস্বত্ব সংরক্ষিত।</span><span>ঢাকা, বাংলাদেশ</span></div></footer>;
}

function MobileNav() {
  const { cart } = useStore();
  return <nav className="mobile-nav" aria-label="মোবাইল মেনু"><NavLink to="/" end><Icon name="home"/><span>হোম</span></NavLink><NavLink to="/shop"><Icon name="grid"/><span>পণ্য</span></NavLink><Link to="/cart" className="mobile-bag"><span className="mobile-cart-count">{cart.length}</span><Icon name="bag"/><span>ব্যাগ</span></Link><NavLink to="/contact"><Icon name="user"/><span>যোগাযোগ</span></NavLink></nav>;
}

function ToastNotice() {
  const { notice } = useStore();
  return <div className={`toast-notice ${notice ? 'visible' : ''}`} role="status" aria-live="polite">{notice}</div>;
}

function PageIntro({ eyebrow, title, text }) {
  return <div className="page-intro"><span className="eyebrow"><i/> {eyebrow}</span><h1>{title}</h1>{text && <p>{text}</p>}</div>;
}

function CategoryCards() {
  return <div className="category-grid">{categories.filter(category => category.id !== 'all').map(category => <Link className={`category-card category-${category.id}`} to={`/shop?category=${category.id}`} key={category.id}><span className="category-icon"><Icon name={category.icon} size={17}/></span><span className="category-copy"><strong>{category.label}</strong><small>{category.note}</small></span><Icon name="arrow" size={17}/></Link>)}</div>;
}

function HeroProductCarousel() {
  const featured = products.filter(product => ['turtle-toy', 'character-mug', 'pastel-vase', 'yellow-car', 'cloud-diffuser', 'green-gem-ring', 'blossom-night-lamp', 'sage-mini-fan', 'botanical-scarf', 'mini-crossbody-bag', 'mushroom-night-light', 'wireless-earbuds', 'retro-sunglasses'].includes(product.id));
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % featured.length), 1600);
    return () => window.clearInterval(timer);
  }, [featured.length]);
  const product = featured[index];
  return <Link className="hero-product-glass" to={`/product/${product.id}`} aria-label={`${product.name} দেখুন`}>
    <span className="glass-label"><i/> বেছে নেওয়া পণ্য</span>
    <span className="hero-product-content" key={product.id}><img src={product.image} alt={product.name}/><span className="glass-product-name">{product.name}</span><span className="glass-product-link">{formatPrice(product.price)} · দেখে নিন <Icon name="arrow" size={14}/></span></span>
  </Link>;
}

function ProductCard({ product, style }) {
  const { favorites, toggleFavorite, addToCart } = useStore();
  const saved = favorites.includes(product.id);
  return <article className="product-card" style={style}>
    <Link className="product-photo" to={`/product/${product.id}`}><img src={product.image} alt={product.name} loading="lazy"/><span className="product-badge">{product.badge}</span></Link>
    <button className={`favorite-button ${saved ? 'is-favorite' : ''}`} aria-label={saved ? 'পছন্দের তালিকা থেকে সরান' : 'পছন্দের তালিকায় রাখুন'} onClick={() => toggleFavorite(product.id)}><Icon name="heart" size={17}/></button>
    <div className="product-card-info"><span className="product-category">{product.categoryLabel}</span><Link className="product-name" to={`/product/${product.id}`}>{product.name}</Link><div className="product-price-row"><strong>{formatPrice(product.price)}</strong><small>প্রস্তাবিত দাম</small></div><div className="product-card-bottom"><Link className="product-card-cta" to={`/product/${product.id}`}>বিস্তারিত দেখুন <Icon name="arrow" size={15}/></Link><button className="round-add" aria-label="ব্যাগে যোগ করুন" onClick={() => addToCart(product.id)}><Icon name="plus" size={17}/></button></div></div>
  </article>;
}

function ProductGrid({ items }) {
  return items.length ? <div className="product-grid">{items.map((product, index) => <ProductCard product={product} key={product.id} style={{ '--card-index': index }}/>)}</div> : <div className="empty-state"><span>✳</span><h2>এখানে মেলেনি</h2><p>অন্য শব্দ দিয়ে খুঁজুন অথবা সব পণ্য দেখুন।</p><Link className="button" to="/shop">সব পণ্য দেখুন</Link></div>;
}

function HomePage() {
  const homeFeatured = ['turtle-toy', 'cloud-diffuser', 'green-gem-ring', 'botanical-scarf', 'bear-mug', 'mini-crossbody-bag', 'wireless-earbuds', 'scented-candle'].map(id => products.find(product => product.id === id)).filter(Boolean);
  return <>
    <main><section className="hero-section wrap"><div className="hero-panel"><div className="hero-image"/><div className="hero-copy"><span className="eyebrow"><i/> চীন থেকে যত্ন করে বেছে আনা</span><h1>প্রতিদিনের জীবনে<br/><em>নতুন কিছু।</em></h1><p>ছোট্ট কোনো আবিষ্কার, আপনার দিনের বড় স্বস্তি। দরকারি আর সুন্দর—এমন সব পণ্য এক জায়গায়।</p><div className="hero-buttons"><Link className="button" to="/shop">পণ্য ঘুরে দেখুন <Icon name="arrow"/></Link><a className="text-button" href={`tel:${phone}`}>অর্ডার নিয়ে কথা বলুন</a></div><div className="hero-proof"><span className="proof-mark"><Icon name="check" size={15}/></span><span>মিরপুর ১২-তে আমাদের শোরুম<br/><small>ঢাকা, বাংলাদেশ</small></span></div></div><HeroProductCarousel/><div className="hero-float"><span>NOTUN KICHU</span><strong>একটু অন্যরকম,<br/>ভীষণ দরকারি</strong><Link to="/about">আমাদের গল্প <Icon name="arrow" size={14}/></Link></div><span className="hero-index">N° 01 / DHAKA</span></div></section>
      <section className="section-block wrap"><div className="section-heading"><div><span className="section-kicker">আপনার পছন্দমতো</span><h2>ক্যাটাগরি ঘুরে দেখুন</h2><p>ভালো লাগার মতো নতুন কিছু খুঁজে নিন</p></div><Link className="under-link" to="/shop">সব পণ্য <Icon name="arrow" size={16}/></Link></div><CategoryCards/></section>
      <section className="featured-band"><div className="wrap"><div className="section-heading"><div><span className="section-kicker">দোকানের ছবিতে দেখা</span><h2>এই মুহূর্তের পছন্দ</h2><p>প্রতিটি পণ্যের জন্য আলাদা স্টুডিও ভিজ্যুয়াল</p></div><Link className="under-link" to="/shop">সব পণ্য <Icon name="arrow" size={16}/></Link></div><ProductGrid items={homeFeatured}/></div></section>
      <section className="service-strip wrap"><div><span className="service-icon"><Icon name="sparkle" size={17}/></span><strong>নতুন কিছু খুঁজে নিন</strong><small>দোকানের সংগ্রহ থেকে বেছে নিন</small></div><div><span className="service-icon"><Icon name="tag" size={17}/></span><strong>দাম ও মডেল জেনে নিন</strong><small>পণ্যের তথ্য সরাসরি জেনে নিন</small></div><div><span className="service-icon"><Icon name="chat" size={17}/></span><strong>অর্ডার নিয়ে কথা বলুন</strong><small>আমাদের সঙ্গে সহজে যোগাযোগ করুন</small></div></section>
      <section className="story-teaser wrap"><div className="story-image"><img src="/assets/store-interior.jpg" alt="Notun Kichu শোরুমে সাজানো পণ্য" loading="lazy"/></div><div className="story-teaser-copy"><span className="section-kicker">আমাদের ছোট্ট গল্প</span><h2>নতুন কিছু খুঁজে পাওয়ার আনন্দ।</h2><p>চীন থেকে এমন সব পণ্য খুঁজে আনি, যা দেখতে সুন্দর, কাজে লাগে, আর দৈনন্দিন জীবনে যোগ করে একটু বাড়তি স্বস্তি।</p><Link className="under-link" to="/about">Notun Kichu সম্পর্কে <Icon name="arrow" size={16}/></Link></div></section>
      <ContactCallout/>
    </main>
  </>;
}

function ShopPage() {
  const [params, setParams] = useSearchState();
  const [selected, setSelected] = useState(params.get('category') || 'all');
  const [query, setQuery] = useState(params.get('q') || '');
  useEffect(() => { setSelected(params.get('category') || 'all'); setQuery(params.get('q') || ''); }, [params]);
  const shown = products.filter(product => (selected === 'all' || product.category === selected) && product.name.toLowerCase().includes(query.toLowerCase()));
  return <main className="wrap page-main"><PageIntro eyebrow="ছোট্ট আবিষ্কার, বড় স্বস্তি" title="সব পণ্য" text="প্রতিটি পণ্যের জন্য আলাদা স্টুডিও ভিজ্যুয়াল। পণ্যের পাশে প্রস্তাবিত দাম দেওয়া আছে—অর্ডারের আগে স্টক ও চূড়ান্ত মূল্য নিশ্চিত করুন।"/>
    <div className="shop-toolbar"><div className="shop-filters">{categories.map(category => <button key={category.id} className={`filter-pill ${selected === category.id ? 'active' : ''}`} onClick={() => { setSelected(category.id); setParams(category.id === 'all' ? {} : { category: category.id }); }}>{category.label}</button>)}</div><label className="shop-search"><Icon name="search" size={17}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="পণ্য খুঁজুন"/></label></div>
    <div className="results-count">{shown.length}টি পণ্য</div><ProductGrid items={shown}/>
  </main>;
}

function useSearchState() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const setParams = next => {
    const url = new URL(window.location.href);
    url.search = new URLSearchParams(next).toString();
    navigate(`${url.pathname}${url.search}`, { replace: true });
  };
  return [params, setParams];
}

function ProductPage() {
  const { id } = useParams();
  const product = products.find(item => item.id === id);
  const { addToCart, favorites, toggleFavorite } = useStore();
  if (!product) return <NotFoundPage/>;
  return <main className="wrap page-main product-detail-page"><div className="breadcrumbs"><Link to="/">হোম</Link><span>/</span><Link to="/shop">সব পণ্য</Link><span>/</span><span>{product.name}</span></div><div className="product-detail"><div className="detail-photo"><img src={product.image} alt={product.name}/><span className="product-badge">{product.badge}</span></div><div className="detail-copy"><span className="section-kicker">{product.categoryLabel}</span><h1>{product.name}</h1><p className="detail-price">{formatPrice(product.price)} <small>প্রস্তাবিত দাম · অর্ডারের আগে নিশ্চিত করুন</small></p><p className="detail-description">{product.description}</p><p className="visual-note">ছবিটি পণ্যের ধারণামূলক উপস্থাপনা। পণ্যের ধরন, স্টক ও চূড়ান্ত মূল্য অর্ডার নিশ্চিতের আগে জেনে নিন।</p><div className="detail-actions"><button className="button" onClick={() => addToCart(product.id)}>ব্যাগে যোগ করুন <Icon name="bag" size={17}/></button><a className="button button-outline" href={`tel:${phone}`}>মডেল ও মূল্য জানুন <Icon name="phone" size={15}/></a><button className={`icon-button detail-fav ${favorites.includes(product.id) ? 'is-favorite' : ''}`} aria-label="পছন্দের তালিকায় রাখুন" onClick={() => toggleFavorite(product.id)}><Icon name="heart"/></button></div><div className="detail-service"><span><Icon name="check" size={16}/> পণ্যের তথ্য ফোনে নিশ্চিত করুন</span><span><Icon name="check" size={16}/> ডেলিভারির তথ্য জেনে নিন</span></div></div></div><section className="related-section"><div className="section-heading"><div><span className="section-kicker">আরও ভালো লাগতে পারে</span><h2>আরও কিছু নতুন</h2></div><Link className="under-link" to="/shop">সব পণ্য <Icon name="arrow" size={16}/></Link></div><ProductGrid items={products.filter(item => item.id !== product.id).slice(0, 4)}/></section></main>;
}

function CartPage() {
  const { cart, removeFromCart } = useStore();
  const items = cart.map(id => products.find(product => product.id === id)).filter(Boolean);
  return <main className="wrap page-main"><PageIntro eyebrow="আপনার বাছাই" title="আপনার ব্যাগ" text="পছন্দের পণ্যগুলো এক জায়গায়। দাম ও অর্ডার নিশ্চিত করতে আমাদের সাথে কথা বলুন।"/>
    {!items.length ? <div className="empty-state"><span className="empty-bag"><Icon name="bag" size={26}/></span><h2>ব্যাগ এখনো খালি</h2><p>দোকান ঘুরে আপনার পছন্দের নতুন কিছু বেছে নিন।</p><Link className="button" to="/shop">পণ্য দেখুন <Icon name="arrow" size={16}/></Link></div> : <div className="cart-layout"><div className="cart-items">{items.map(product => <div className="cart-item" key={product.id}><Link to={`/product/${product.id}`} className="cart-item-image"><img src={product.image} alt={product.name}/></Link><div className="cart-item-copy"><span>{product.categoryLabel}</span><Link to={`/product/${product.id}`}>{product.name}</Link><small>{formatPrice(product.price)} · প্রস্তাবিত</small></div><button className="remove-button" onClick={() => removeFromCart(product.id)}>সরিয়ে দিন</button></div>)}</div><aside className="order-summary"><span className="section-kicker">পরবর্তী ধাপ</span><h2>অর্ডার অনুসন্ধান</h2><p>প্রস্তাবিত মূল্য অনুযায়ী পণ্যের দাম {formatPrice(items.reduce((sum, item) => sum + item.price, 0))}। স্টক, চূড়ান্ত দাম ও ডেলিভারি অর্ডারের আগে নিশ্চিত করুন।</p><Link className="button button-full" to="/checkout">অর্ডার ফর্মে যান <Icon name="arrow" size={16}/></Link><a className="summary-phone" href={`tel:${phone}`}>অথবা ফোন করুন: {displayPhone}</a></aside></div>}
  </main>;
}

function CheckoutPage() {
  const { cart } = useStore();
  const items = cart.map(id => products.find(product => product.id === id)).filter(Boolean);
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' });
  const [error, setError] = useState('');
  const sendInquiry = event => {
    event.preventDefault();
    if (!items.length) return setError('অর্ডার অনুসন্ধানের আগে ব্যাগে পণ্য যোগ করুন।');
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) return setError('নাম, ফোন ও ঠিকানা পূরণ করুন।');
    const order = items.map(item => `• ${item.name}`).join('\n');
    const message = `Assalamu alaikum, Notun Kichu থেকে অর্ডারের তথ্য জানতে চাই.\n\nনাম: ${form.name}\nফোন: ${form.phone}\nঠিকানা: ${form.address}\nপণ্য:\n${order}${form.note ? `\nনোট: ${form.note}` : ''}`;
    window.open(`https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setError('WhatsApp খুলছে—সেখানে বার্তাটি দেখে পাঠিয়ে অর্ডার নিশ্চিত করুন।');
  };
  return <main className="wrap page-main checkout-page"><PageIntro eyebrow="অর্ডার অনুসন্ধান" title="আপনার তথ্য দিন" text="দাম ও ডেলিভারি নিশ্চিত করতে আপনার তথ্য পাঠান। চূড়ান্ত অর্ডার WhatsApp-এ নিশ্চিত হবে।"/>
    <div className="checkout-layout"><form className="checkout-form" onSubmit={sendInquiry}><h2>যোগাযোগের তথ্য</h2><label>আপনার নাম<input value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} autoComplete="name" required/></label><label>মোবাইল নম্বর<input value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} inputMode="tel" autoComplete="tel" required/></label><label>ডেলিভারি ঠিকানা<textarea value={form.address} onChange={event => setForm({ ...form, address: event.target.value })} autoComplete="street-address" rows="3" required/></label><label>অতিরিক্ত নোট <span>(ঐচ্ছিক)</span><textarea value={form.note} onChange={event => setForm({ ...form, note: event.target.value })} rows="2"/></label>{error && <p className="form-message" role="status">{error}</p>}<button className="button" type="submit">WhatsApp-এ অর্ডার পাঠান <Icon name="arrow" size={16}/></button></form><aside className="order-summary checkout-summary"><span className="section-kicker">আপনার পণ্য</span><h2>{items.length}টি পণ্য</h2>{items.length ? items.map(item => <div className="summary-item" key={item.id}><img src={item.image} alt=""/><span>{item.name}<small>মূল্য যোগাযোগে নিশ্চিত হবে</small></span></div>) : <p>ব্যাগে এখনো পণ্য নেই। <Link to="/shop">পণ্য দেখুন</Link></p>}<div className="summary-footnote">পণ্যের দাম, ডেলিভারি চার্জ ও চূড়ান্ত অর্ডার WhatsApp-এ নিশ্চিত হবে।</div></aside></div>
  </main>;
}

function AboutPage() {
  return <main className="wrap page-main about-page"><div className="about-heading"><span className="eyebrow"><i/> Notun Kichu সম্পর্কে</span><h1>প্রতিদিনের জীবনে <em>নতুন কিছু।</em></h1><p>নতুন কিছু খুঁজে পাওয়ার আনন্দ থেকেই আমাদের যাত্রা।</p></div><div className="about-layout"><div className="about-photo"><img src="/assets/store-interior.jpg" alt="Notun Kichu শোরুম"/><span className="about-photo-tag"><Icon name="pin" size={14}/> মিরপুর ১২, ঢাকা</span><div className="about-photo-caption"><small>আমাদের ছোট্ট ঠিকানা</small><strong>NOTUN KICHU</strong></div></div><div className="about-copy"><span className="section-kicker">আমাদের গল্প</span><h2>ছোট্ট আবিষ্কার,<br/><em>বড় স্বস্তি।</em></h2><p>Notun Kichu-তে আমরা চীন থেকে এমন সব ইউনিক পণ্য বেছে আনি, যা দেখতে সুন্দর, কাজে লাগে এবং দৈনন্দিন জীবনে যোগ করে একটু বাড়তি আনন্দ।</p><p>গিফট আইটেম থেকে লাইফস্টাইল—নতুন কোনো স্পেকের পণ্য খুঁজে পাওয়াই আমাদের ভালো লাগা।</p><a className="button" href={`tel:${phone}`}>আমাদের সাথে কথা বলুন <Icon name="phone" size={16}/></a></div></div><div className="about-values"><div><span className="about-value-icon"><Icon name="sparkle" size={17}/></span><strong>নতুনত্ব</strong><p>চেনা দিনের জন্য নতুন আইডিয়া।</p></div><div><span className="about-value-icon"><Icon name="check" size={17}/></span><strong>ব্যবহারিক</strong><p>সুন্দর হওয়ার পাশাপাশি কাজে লাগে।</p></div><div><span className="about-value-icon"><Icon name="heart" size={17}/></span><strong>যত্ন</strong><p>আপনার জন্য পণ্য বাছাইয়ে মনোযোগ।</p></div></div><section className="about-selection"><div className="about-section-heading"><span className="section-kicker">আমাদের বাছাইয়ের ভাবনা</span><h2>পণ্যে চাই নতুনত্ব, সাথে ব্যবহারিক সুবিধা।</h2><p>নতুন কিছু খুঁজতে গিয়ে আমরা এমন জিনিসের দিকে নজর দিই, যা সুন্দর দেখায়, কাজে লাগে, কিংবা উপহার হিসেবে আনন্দ দিতে পারে।</p></div><div className="about-selection-grid"><article><span><Icon name="sparkle" size={17}/></span><strong>নতুন স্পেক</strong><p>চেনা পণ্যের ভেতরেও আলাদা নকশা বা সুবিধা খুঁজি।</p></article><article><span><Icon name="check" size={17}/></span><strong>দৈনন্দিন কাজে লাগে</strong><p>দেখতে ভালো হওয়ার পাশাপাশি ব্যবহারেও উপযোগী কি না দেখি।</p></article><article><span><Icon name="gift" size={17}/></span><strong>গিফট ও লাইফস্টাইল</strong><p>ঘর, জীবনযাপন আর উপহারের জন্য নানা ধরনের পণ্য রাখার চেষ্টা করি।</p></article></div></section><section className="about-order"><div className="about-order-copy"><span className="section-kicker">পছন্দ থেকে অর্ডার</span><h2>কেনাকাটা শুরু করুন সহজে।</h2><p>পণ্য বেছে নেওয়া থেকে অর্ডার নিশ্চিত করা পর্যন্ত—প্রয়োজনীয় তথ্য জেনে তারপর সিদ্ধান্ত নিন।</p><Link className="button" to="/shop">সব পণ্য ঘুরে দেখুন <Icon name="arrow" size={16}/></Link></div><div className="about-order-steps"><div><span>১</span><p><strong>পণ্য বেছে নিন</strong><small>পছন্দের ক্যাটাগরি বা পণ্যটি খুলুন।</small></p></div><div><span>২</span><p><strong>দাম ও স্টক নিশ্চিত করুন</strong><small>দেখানো দাম প্রস্তাবিত; ফোনে চূড়ান্ত তথ্য জেনে নিন।</small></p></div><div><span>৩</span><p><strong>অর্ডারের তথ্য পাঠান</strong><small>ফর্ম পূরণ করে WhatsApp-এ অর্ডার অনুসন্ধান পাঠান।</small></p></div></div></section></main>;
}

function ContactCallout() {
  return <section className="contact-callout wrap"><div><span className="section-kicker">কোনো প্রশ্ন আছে?</span><h2>নতুন কিছু খুঁজছেন?</h2><p>পণ্যের দাম, মডেল ও ডেলিভারি জানতে আমাদের সাথে কথা বলুন।</p></div><a className="button" href={`tel:${phone}`}><Icon name="phone" size={16}/> {displayPhone}</a></section>;
}

function ContactPage() {
  return <main className="wrap page-main contact-page"><section className="contact-hero"><div className="contact-hero-copy"><span className="eyebrow"><i/> আমরা আছি আপনার পাশে</span><h1>কথা বলুন<br/><em>নতুন কিছু নিয়ে।</em></h1><p>পণ্যের তথ্য, দাম কিংবা অর্ডার—যেকোনো প্রয়োজনে আমাদের সঙ্গে যোগাযোগ করুন।</p><a className="button" href={`tel:${phone}`}><Icon name="phone" size={16}/> এখনই কল করুন</a></div><div className="contact-hero-photo"><img src="/assets/store-interior.jpg" alt="Notun Kichu শোরুম"/><span className="contact-location-chip"><Icon name="pin" size={15}/> মিরপুর ১২, ঢাকা</span><span className="contact-photo-caption">NOTUN KICHU <small>নতুন কিছু খুঁজে পাওয়ার ঠিকানা</small></span></div></section><div className="contact-grid"><a className="contact-card contact-phone" href={`tel:${phone}`}><span className="contact-icon"><Icon name="phone" size={22}/></span><small>ফোন করুন</small><strong>{displayPhone}</strong><span className="contact-description">পণ্যের তথ্য ও অর্ডারের জন্য</span><span className="contact-action">এখনই কল করুন <Icon name="arrow" size={14}/></span></a><a className="contact-card contact-email-card" href="mailto:notunkichu2k26@gmail.com"><span className="contact-icon"><Icon name="mail" size={22}/></span><small>ইমেইল করুন</small><strong className="contact-email">notunkichu2k26@gmail.com</strong><span className="contact-description">পণ্যের তথ্য জানতে লিখুন</span><span className="contact-action">ইমেইল লিখুন <Icon name="arrow" size={14}/></span></a><a className="contact-card contact-address-card" href="https://maps.google.com/?q=5th+Floor+Infinity+Building+Mirpur+12+Dhaka" target="_blank" rel="noreferrer"><span className="contact-icon"><Icon name="pin" size={22}/></span><small>শোরুমে আসুন</small><strong>মিরপুর ১২, ঢাকা</strong><span className="contact-description">{address}</span><span className="contact-action">ম্যাপে দেখুন <Icon name="arrow" size={14}/></span></a></div><section className="contact-map-section"><div className="contact-map-heading"><div><span className="section-kicker">ঢাকায় আমাদের ঠিকানা</span><h2>মিরপুর ১২-তে খুঁজে নিন</h2><p>{address}</p></div><a className="button button-outline" href="https://maps.google.com/?q=5th+Floor+Infinity+Building+Mirpur+12+Dhaka" target="_blank" rel="noreferrer"><Icon name="pin" size={16}/> ম্যাপে খুলুন</a></div><div className="contact-map-frame"><iframe title="Notun Kichu শোরুমের মানচিত্র" src="https://maps.google.com/maps?q=5th%20Floor%20Infinity%20Building%20Mirpur%2012%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><div className="map-location-card"><span className="contact-icon"><Icon name="pin" size={18}/></span><div><strong>Notun Kichu</strong><small>ইনফিনিটি বিল্ডিং · মিরপুর ১২</small></div></div><a className="map-expand" href="https://maps.google.com/?q=5th+Floor+Infinity+Building+Mirpur+12+Dhaka" target="_blank" rel="noreferrer" aria-label="Google Maps-এ ঠিকানা খুলুন"><Icon name="arrow" size={17}/></a></div></section><ContactCallout/></main>;
}

function NotFoundPage() {
  return <main className="wrap page-main"><div className="empty-state"><span>404</span><h2>এই পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h2><p>হয়তো ঠিকানাটি বদলে গেছে।</p><Link className="button" to="/">হোমে ফিরে যান</Link></div></main>;
}

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return <StoreProvider><div className="app-shell"><ScrollReset/><Header/><Routes><Route path="/" element={<HomePage/>}/><Route path="/shop" element={<ShopPage/>}/><Route path="/product/:id" element={<ProductPage/>}/><Route path="/cart" element={<CartPage/>}/><Route path="/checkout" element={<CheckoutPage/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="*" element={<NotFoundPage/>}/></Routes><Footer/><MobileNav/><ToastNotice/></div></StoreProvider>;
}
