// Main app shell — Firebase auth gate + real-time notes wiring

const NAV = [
  { id: 'home', label: 'Dashboard', icon: 'home', group: 'main' },
  { id: 'notes', label: 'Notes', icon: 'notes', group: 'main' },
  { id: 'files', label: 'Files', icon: 'files', group: 'main' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar', group: 'main' },
  { id: 'arrangements', label: 'Funeral Arrangements', icon: 'arrangements', group: 'operations' },
  { id: 'memorials', label: 'Memorials', icon: 'memorials', group: 'operations' },
  { id: 'stock', label: 'Stock Inventory', icon: 'stock', group: 'operations' },
  { id: 'staff', label: 'Staff', icon: 'staff', group: 'operations' },
  { id: 'vehicles', label: 'Vehicles', icon: 'vehicles', group: 'operations' },
  { id: 'churches', label: 'Churches & Crematoriums', icon: 'churches', group: 'operations' },
  { id: 'payments', label: 'Payments', icon: 'payments', group: 'business' },
  { id: 'integrations', label: 'Web Links & Integrations', icon: 'integrations', group: 'business' },
  { id: 'settings', label: 'Settings', icon: 'settings', group: 'business' },
];

const TITLES = {
  home: { crumb: 'Overview', h: 'Dashboard' },
  notes: { crumb: 'Workspace', h: 'Notes' },
  files: { crumb: 'Workspace', h: 'Files' },
  calendar: { crumb: 'Workspace', h: 'Calendar' },
  arrangements: { crumb: 'Operations', h: 'Funeral Arrangements' },
  memorials: { crumb: 'Operations', h: 'Memorials' },
  stock: { crumb: 'Operations', h: 'Stock Inventory' },
  staff: { crumb: 'Operations', h: 'Staff' },
  vehicles: { crumb: 'Operations', h: 'Vehicles' },
  churches: { crumb: 'Operations', h: 'Churches & Crematoriums' },
  payments: { crumb: 'Business', h: 'Payments' },
  integrations: { crumb: 'Business', h: 'Web Links & Integrations' },
  settings: { crumb: 'Business', h: 'Settings' },
};

const PLACEHOLDERS = {
  arrangements: { title: 'Funeral Arrangements', body: 'Full case management — family details, deceased records, service planning, supplier coordination, and document tracking. Coming soon.', icon: 'arrangements' },
  memorials: { title: 'Memorials', body: 'Track memorial jobs from order through to delivery — headstones, plaques, urns, and floral tributes. Linked to family records and supplier workflows.', icon: 'memorials' },
  staff: { title: 'Staff', body: 'Roster, contact details, training records, on-call schedules and time-off tracking.', icon: 'staff' },
  vehicles: { title: 'Vehicles', body: 'Fleet management for hearses and limousines — service schedules, MOT dates, fuel logs and driver assignments.', icon: 'vehicles' },
  churches: { title: 'Churches & Crematoriums', body: 'Directory of venues with contact details, slot availability, charges, and special arrangements. Quick-book directly from arrangement screens.', icon: 'churches' },
  payments: { title: 'Payments', body: 'Invoices, family payments, supplier accounts, outstanding balances. For now use the Direct Debit Link, Payment Screen, and Funeral Finance tiles in Web Links.', icon: 'payments' },
  settings: { title: 'Settings', body: 'Business details, staff permissions, integrations, notification preferences and templates.', icon: 'settings' },
};

// ===== Login screen =====
const LoginScreen = () => {
  const [email, setEmail] = React.useState('info@crymbleandsons.com');
  const [pw, setPw] = React.useState('');
  const [err, setErr] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr(''); setBusy(true);
    try {
      await window.fb.signIn(email.trim(), pw);
      setPw('');
    } catch (e) {
      const c = e.code || '';
      if (c.includes('invalid-credential') || c.includes('wrong-password') || c.includes('user-not-found')) setErr('Wrong email or password');
      else if (c.includes('too-many-requests')) setErr('Too many attempts — try again in a minute');
      else if (c.includes('network')) setErr('No internet connection');
      else setErr(e.message || 'Sign-in failed');
    } finally { setBusy(false); }
  };

  return (
    <div style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'var(--bg)',padding:20}}>
      <form onSubmit={submit} style={{background:'var(--bg-card)',border:'1px solid var(--line)',borderRadius:'var(--r-xl)',boxShadow:'var(--shadow-lg)',padding:36,width:'100%',maxWidth:380}}>
        <div style={{textAlign:'center',marginBottom:24}}>
          <div className="serif" style={{fontSize:26,letterSpacing:'-.01em',color:'var(--ink)'}}>David Crymble</div>
          <div style={{fontSize:11,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--ink-mute)',marginTop:4}}>&amp; Sons · Funeral Directors</div>
        </div>
        <div style={{display:'grid',gap:14}}>
          <label style={{display:'grid',gap:6}}>
            <span style={{fontSize:11,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--ink-mute)'}}>Email</span>
            <input type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} className="note-input"/>
          </label>
          <label style={{display:'grid',gap:6}}>
            <span style={{fontSize:11,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--ink-mute)'}}>Password</span>
            <input type="password" autoComplete="current-password" autoFocus required value={pw} onChange={e=>setPw(e.target.value)} className="note-input"/>
          </label>
          <button type="submit" className="btn primary" disabled={busy} style={{justifyContent:'center',marginTop:6,padding:'11px 16px'}}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
          {err && <div style={{color:'var(--danger)',fontSize:13,minHeight:'1.2em'}}>{err}</div>}
        </div>
      </form>
    </div>
  );
};

// ===== Main App =====
const App = ({ user }) => {
  const [section, setSection] = React.useState('home');
  const [collapsed, setCollapsed] = React.useState(false);
  const [theme, setTheme] = React.useState(() => localStorage.getItem('crymble-theme') || 'light');
  const [launchPanel, setLaunchPanel] = React.useState(null);
  const [notes, setNotes] = React.useState([]);
  const [defaultName, setDefaultName] = React.useState(() => localStorage.getItem('crymble-admin-author-name') || '');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('crymble-theme', theme);
  }, [theme]);

  React.useEffect(() => {
    return window.fb.subscribeNotes(setNotes);
  }, []);

  const goSection = (id) => setSection(id);

  const onLaunchClick = (q) => {
    if (q.embed && q.url) {
      setLaunchPanel(q);
    } else if (q.url) {
      window.open(q.url, '_blank', 'noopener,noreferrer');
    } else {
      setLaunchPanel(q);
    }
  };

  const addNote = async (data) => {
    await window.fb.addNote(data);
    if (data.staff && data.staff !== defaultName) setDefaultName(data.staff);
  };
  const deleteNote = async (id) => { await window.fb.deleteNote(id); };

  const renderSection = () => {
    switch (section) {
      case 'home': return <DashboardHome onOpenSection={goSection} onOpenLaunch={onLaunchClick} notes={notes} />;
      case 'notes': return <NotesPage notes={notes} onAddNote={addNote} onDeleteNote={deleteNote} defaultName={defaultName} />;
      case 'files': return <FilesPage />;
      case 'calendar': return <CalendarPage />;
      case 'stock': return <StockPage />;
      case 'integrations': return <IntegrationsPage onOpenLaunch={onLaunchClick} />;
      default:
        const p = PLACEHOLDERS[section];
        return p ? <PlaceholderSection {...p} iconName={p.icon} /> : null;
    }
  };

  const groups = [
    { id: 'main', label: 'Workspace' },
    { id: 'operations', label: 'Operations' },
    { id: 'business', label: 'Business' },
  ];

  const t = TITLES[section];
  const today = TODAY.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const userInitials = (user.email || '').split('@')[0].slice(0,2).toUpperCase();

  return (
    <div className={`app ${collapsed ? 'collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">
            <span className="top">David Crymble</span>
            <span className="sub">& Sons · Funeral Directors</span>
          </div>
          <button className="collapse-btn" onClick={()=>setCollapsed(!collapsed)} title={collapsed?'Expand':'Collapse'}>
            <Icon name="chevron" size={14} style={{transform:'rotate(180deg)'}}/>
          </button>
        </div>
        <nav className="nav">
          {groups.map(g => (
            <div key={g.id}>
              <div className="nav-section-label">{g.label}</div>
              {NAV.filter(n => n.group === g.id).map(n => (
                <button
                  key={n.id}
                  className={`nav-item ${section===n.id?'active':''}`}
                  onClick={()=>goSection(n.id)}
                  title={collapsed ? n.label : undefined}
                >
                  <span className="icon-wrap"><Icon name={n.icon} size={18}/></span>
                  <span className="label">{n.label}</span>
                  {n.id === 'notes' && notes.length > 0 && <span className="badge">{notes.length}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="avatar" title={user.email}>{userInitials}</div>
          <div className="user-meta">
            <div className="name">{defaultName || 'Crymble Admin'}</div>
            <div className="role">{user.email}</div>
          </div>
          <button className="icon-btn" title="Sign out" onClick={() => window.fb.signOut()} style={{width:32,height:32}}>
            <Icon name="close" size={14}/>
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-title">
            <span className="breadcrumb">{t.crumb}</span>
            <span className="h">{t.h}</span>
          </div>
          <div className="topbar-spacer"/>
          <div className="search-box">
            <Icon name="search" size={16}/>
            <input placeholder="Search families, files, notes…"/>
            <kbd>⌘ K</kbd>
          </div>
          <div className="date-pill">{today}</div>
          <div className="theme-toggle">
            <button className={theme==='light'?'active':''} onClick={()=>setTheme('light')} title="Light"><Icon name="sun" size={15}/></button>
            <button className={theme==='dark'?'active':''} onClick={()=>setTheme('dark')} title="Dark"><Icon name="moon" size={15}/></button>
          </div>
          <button className="icon-btn" title="Notifications"><Icon name="bell" size={17}/><span className="dot"/></button>
        </header>

        <div className="content" data-screen-label={t.h}>
          {renderSection()}
        </div>
      </main>

      {launchPanel && (
        <div className="panel-overlay" onClick={()=>setLaunchPanel(null)}>
          <div className="panel" style={launchPanel.embed ? {width:'min(1100px, 96vw)', height:'88vh'} : undefined} onClick={e=>e.stopPropagation()}>
            <div className="panel-head">
              <span style={{width:36,height:36,borderRadius:8,background:'var(--gold-tint)',display:'grid',placeItems:'center',color:'var(--gold-deep)'}}>
                <Icon name={launchPanel.icon} size={18}/>
              </span>
              <h3>{launchPanel.label}</h3>
              {launchPanel.group === 'external' && <span className="pill gold">External</span>}
              {launchPanel.embed && <span className="pill gold">Embedded</span>}
              {launchPanel.url && (
                <a className="btn ghost sm" href={launchPanel.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
                  <Icon name="link" size={14}/>Open in new tab
                </a>
              )}
              <button className="icon-btn" onClick={()=>setLaunchPanel(null)}><Icon name="close" size={16}/></button>
            </div>
            <div className="panel-body" style={launchPanel.embed ? {padding:0, display:'flex'} : undefined}>
              {launchPanel.embed ? (
                <iframe
                  src={launchPanel.url}
                  title={launchPanel.label}
                  style={{flex:1, width:'100%', border:0, background:'var(--bg-sunk)'}}
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  allow="clipboard-write; fullscreen"
                />
              ) : (
                <div>
                  <p style={{color:'var(--ink-mute)',marginTop:0}}>{launchPanel.desc || `Quick view of ${launchPanel.label}.`}</p>
                  <div style={{height:200,background:'var(--bg-sunk)',borderRadius:12,display:'grid',placeItems:'center',color:'var(--ink-faint)',fontSize:13,letterSpacing:'.08em',textTransform:'uppercase',marginTop:16,border:'1px solid var(--line)'}}>
                    Opens in a new tab
                  </div>
                  <div style={{display:'flex',gap:10,marginTop:18,justifyContent:'flex-end'}}>
                    <button className="btn" onClick={()=>setLaunchPanel(null)}>Close</button>
                    <a className="btn gold" href={launchPanel.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
                      <Icon name="link" size={14}/>Open {launchPanel.label}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ===== Root: auth gate =====
const Root = () => {
  const [fbReady, setFbReady] = React.useState(() => !!window.fb);
  const [authState, setAuthState] = React.useState({ loaded: false, user: null });

  React.useEffect(() => {
    if (fbReady) return;
    if (window.fb) { setFbReady(true); return; }
    const handler = () => setFbReady(true);
    window.addEventListener('fb-ready', handler);
    return () => window.removeEventListener('fb-ready', handler);
  }, [fbReady]);

  React.useEffect(() => {
    if (!fbReady) return;
    return window.fb.onAuthChanged((user) => setAuthState({ loaded: true, user }));
  }, [fbReady]);

  if (!fbReady || !authState.loaded) {
    return <div style={{minHeight:'100vh',display:'grid',placeItems:'center',color:'var(--ink-mute)',fontFamily:'Inter,sans-serif'}}>Loading…</div>;
  }
  if (!authState.user) return <LoginScreen/>;
  return <App user={authState.user}/>;
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root/>);
