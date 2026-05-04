// Section components for Crymble admin

const fmtDate = (s) => {
  const d = new Date(s);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};
const fmtTime = (h) => {
  const hr = Math.floor(h);
  const mn = Math.round((h - hr) * 60);
  return `${String(hr).padStart(2,'0')}:${String(mn).padStart(2,'0')}`;
};

// ============ DASHBOARD HOME ============
const DashboardHome = ({ onOpenSection, onOpenLaunch, notes }) => {
  const today = SAMPLE_FUNERALS.filter(f => f.date === '2026-05-04');
  const upcoming = SAMPLE_FUNERALS.filter(f => f.date !== '2026-05-04');
  const recentNotes = (notes || []).slice(0, 4);
  const lowStock = SAMPLE_STOCK.filter(s => s.qty <= s.reorder).slice(0, 4);

  return (
    <div>
      <div className="greeting">
        <div>
          <h1>Good morning, James.</h1>
          <div className="sub">Two services today. Wilson at 10:30, Hartley at 13:00.</div>
        </div>
        <div className="meta">
          <div><b>2</b>Today</div>
          <div><b>4</b>This week</div>
          <div><b>£12,840</b>Outstanding</div>
        </div>
      </div>

      <div className="kpi-row">
        <div className="kpi accent">
          <div className="label">Today's services</div>
          <div className="value">2</div>
          <div className="delta">Wilson · Hartley</div>
        </div>
        <div className="kpi">
          <div className="label">This week</div>
          <div className="value">6</div>
          <div className="delta">3 crematorium · 3 burial</div>
        </div>
        <div className="kpi">
          <div className="label">Active arrangements</div>
          <div className="value">11</div>
          <div className="delta">2 awaiting family decision</div>
        </div>
        <div className="kpi">
          <div className="label">Stock alerts</div>
          <div className="value">5</div>
          <div className="delta">2 critical · 3 low</div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="card">
          <div className="card-head">
            <div className="title">Today</div>
            <span className="ct">{today.length}</span>
            <button className="link" onClick={() => onOpenSection('arrangements')}>
              All arrangements <Icon name="chevron" size={14} />
            </button>
          </div>
          <div className="card-body tight">
            {today.map(f => (
              <div key={f.id} className="fun-row today">
                <div className="time">{f.time}<small>{fmtDate(f.date)}</small></div>
                <div>
                  <div className="deceased">{f.deceased} <span style={{color:'var(--ink-faint)', fontWeight:400, fontSize:12, marginLeft:4}}>· {f.age}</span></div>
                  <div className="meta">
                    <span>{f.service}</span>
                    <span className="sep">·</span>
                    <span>{f.coffin}</span>
                  </div>
                </div>
                <div className="director">
                  <span className="avatar sm">{f.director.split(' ').map(s=>s[0]).join('')}</span>
                  <span style={{display:'flex',flexDirection:'column'}}>
                    <span style={{color:'var(--ink-soft)'}}>{f.director.split(' ')[0]}</span>
                    <span className="pill gold" style={{marginTop:2}}>Lead</span>
                  </span>
                </div>
              </div>
            ))}
            <div style={{borderTop:'1px solid var(--line)', marginTop:0}}></div>
            <div style={{padding:'12px 20px 4px', fontSize:12, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--ink-faint)'}}>Upcoming this week</div>
            {upcoming.slice(0, 3).map(f => (
              <div key={f.id} className="fun-row">
                <div className="time">{f.time}<small>{f.status}</small></div>
                <div>
                  <div className="deceased">{f.deceased}</div>
                  <div className="meta">
                    <span>{f.service}</span>
                    <span className="sep">·</span>
                    <span>{f.director}</span>
                  </div>
                </div>
                <span className="pill">{f.coffin.split(' — ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:20}}>
          <div className="card">
            <div className="card-head">
              <div className="title">Recent notes</div>
              <button className="link" onClick={() => onOpenSection('notes')}>View all <Icon name="chevron" size={14} /></button>
            </div>
            <div className="card-body tight">
              {recentNotes.length === 0 && (
                <div style={{padding:30,textAlign:'center',color:'var(--ink-faint)',fontSize:13}}>No notes yet — head to Notes to add the first.</div>
              )}
              {recentNotes.map(n => (
                <div key={n.id} className="note-row" onClick={() => onOpenSection('notes')}>
                  <div className="top">
                    {n.priority === 'high' && <span className="pill danger dot">High</span>}
                    <div className="t">{n.title}</div>
                  </div>
                  <div className="body">{n.body}</div>
                  <div className="footer">
                    <span>{n.staff}</span>
                    {n.created && <><span>·</span><span>{fmtDate(n.created)}</span></>}
                    {n.linkedTo && <><span>·</span><span>{n.linkedTo}</span></>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div className="title">Stock alerts</div>
              <button className="link" onClick={() => onOpenSection('stock')}>Inventory <Icon name="chevron" size={14} /></button>
            </div>
            <div className="card-body tight">
              {lowStock.map(s => {
                const pct = Math.min(100, (s.qty / Math.max(s.reorder*2, 1)) * 100);
                const critical = s.qty < s.reorder * 0.6;
                return (
                  <div key={s.id} className="stock-alert">
                    <div>
                      <div className="name">{s.name}</div>
                      <div className="meta">{s.qty} in stock · reorder at {s.reorder} · {s.supplier}</div>
                      <div className="bar-track"><div className={`bar-fill ${critical?'low':''}`} style={{width: pct+'%'}}/></div>
                    </div>
                    <span className={`pill ${critical?'danger':'gold'}`}>{critical?'Critical':'Low'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="dash-grid-3">
        <div className="card">
          <div className="card-head">
            <div className="title">Calendar</div>
            <button className="link" onClick={() => onOpenSection('calendar')}>Open <Icon name="chevron" size={14} /></button>
          </div>
          <div className="card-body">
            <div style={{fontSize:12, color:'var(--ink-mute)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:8}}>Tomorrow · Tue 5 May</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {SAMPLE_EVENTS.filter(e=>e.day===2).map((e,i)=>(
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:10,paddingLeft:10,borderLeft:`3px solid ${e.type==='funeral'?'var(--gold)':e.type==='viewing'?'#a88547':'var(--ink-faint)'}`}}>
                  <div>
                    <div style={{fontWeight:500,fontSize:13.5}}>{e.title}</div>
                    <div style={{fontSize:12,color:'var(--ink-mute)'}}>{fmtTime(e.start)} – {fmtTime(e.end)} · {e.staff}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="title">Files needing attention</div>
            <button className="link" onClick={() => onOpenSection('files')}>All files <Icon name="chevron" size={14} /></button>
          </div>
          <div className="card-body" style={{display:'flex',flexDirection:'column',gap:12}}>
            {[
              {n:'Wilson — Death certificate', m:'Awaiting registrar copy'},
              {n:'Hartley — Insurance form', m:'Family signature needed'},
              {n:'Doherty — Order of Service', m:'Final proof from family'},
              {n:'McKee — Cremation form 4', m:'Doctor signature pending'},
            ].map((f,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:10,fontSize:13.5}}>
                <span style={{width:32,height:32,borderRadius:6,background:'var(--bg-sunk)',display:'grid',placeItems:'center',color:'var(--gold-deep)',flexShrink:0}}>
                  <Icon name="files" size={16}/>
                </span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',color:'var(--ink)',fontWeight:500}}>{f.n}</div>
                  <div style={{fontSize:12,color:'var(--ink-mute)'}}>{f.m}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="title">Quick links</div>
            <button className="link" onClick={() => onOpenSection('integrations')}>All <Icon name="chevron" size={14} /></button>
          </div>
          <div className="ql-grid">
            {QUICK_LAUNCH.slice(0, 8).map((q, i) => (
              <button key={i} className={`ql-tile ${q.group}`} onClick={()=>onOpenLaunch(q)}>
                <span className="ico"><Icon name={q.icon} size={18}/></span>
                <span>{q.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ NOTES ============
const NotesPage = ({ notes, onAddNote, onDeleteNote, defaultName }) => {
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState('All');
  const [selectedId, setSelectedId] = React.useState(null);
  const [adding, setAdding] = React.useState(false);
  const [draft, setDraft] = React.useState({ title: '', body: '', category: 'Funeral', priority: 'normal', linkedTo: '', staff: defaultName || '' });
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (defaultName && !draft.staff) setDraft(d => ({...d, staff: defaultName}));
  }, [defaultName]);

  const cats = ['All', 'Funeral', 'Crematorium', 'Stock', 'Vehicles', 'Documents', 'Staff'];
  const filtered = notes.filter(n => {
    const matchQ = !query || ((n.title||'')+(n.body||'')+(n.staff||'')+(n.linkedTo||'')).toLowerCase().includes(query.toLowerCase());
    const matchF = filter === 'All' || n.category === filter;
    return matchQ && matchF;
  });
  const selected = notes.find(n => n.id === selectedId) || filtered[0];

  const addNote = async () => {
    if (!draft.title.trim() || !draft.staff.trim() || saving) return;
    setSaving(true);
    try {
      await onAddNote({
        title: draft.title.trim(),
        body: draft.body.trim(),
        category: draft.category,
        priority: draft.priority,
        linkedTo: draft.linkedTo.trim() || 'General',
        staff: draft.staff.trim(),
      });
      try { localStorage.setItem('crymble-admin-author-name', draft.staff.trim()); } catch(e) {}
      setAdding(false);
      setDraft({ title: '', body: '', category: 'Funeral', priority: 'normal', linkedTo: '', staff: draft.staff.trim() });
    } catch (e) {
      alert('Could not save note: ' + (e.message || e));
    } finally {
      setSaving(false);
    }
  };

  const deleteSelected = async () => {
    if (!selected) return;
    if (!confirm('Delete this note?')) return;
    try { await onDeleteNote(selected.id); } catch (e) { alert('Could not delete: ' + (e.message || e)); }
  };

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:18}}>
        <p style={{margin:0,color:'var(--ink-mute)',fontSize:14,flex:1}}>Quick notes for daily operations. Attach to a person, arrangement, memorial or staff member.</p>
        <button className="btn gold" onClick={()=>setAdding(true)}><Icon name="plus" size={14}/>New note</button>
      </div>

      <div className="notes-layout">
        <div className="notes-list">
          <div className="notes-search">
            <div className="search-box" style={{width:'100%'}}>
              <Icon name="search" size={16}/>
              <input placeholder="Search notes..." value={query} onChange={e=>setQuery(e.target.value)}/>
            </div>
          </div>
          <div className="notes-filter-bar">
            {cats.map(c => (
              <span key={c} className={`pill ${filter===c?'active':''}`} onClick={()=>setFilter(c)}>{c}</span>
            ))}
          </div>
          <div className="notes-scroll">
            {filtered.length === 0 && (
              <div style={{padding:30,textAlign:'center',color:'var(--ink-faint)',fontSize:13}}>No notes match.</div>
            )}
            {filtered.map(n => (
              <div key={n.id} className={`note-item ${selected?.id===n.id?'selected':''}`} onClick={()=>{setSelectedId(n.id);setAdding(false);}}>
                <div className="t">{n.title}</div>
                <div className="b">{n.body}</div>
                <div className="f">
                  {n.priority === 'high' && <span className="pill danger" style={{padding:'1px 7px',fontSize:10}}>High</span>}
                  <span>{n.category}</span>
                  {n.created && <><span>·</span><span>{fmtDate(n.created)}</span></>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="note-detail">
          {adding ? (
            <>
              <h2>New note</h2>
              <input className="note-input title" placeholder="Title" value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})} autoFocus/>
              <input className="note-input" style={{marginTop:14}} placeholder="Your name" value={draft.staff} onChange={e=>setDraft({...draft,staff:e.target.value})}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginTop:14}}>
                <select className="note-input" value={draft.category} onChange={e=>setDraft({...draft,category:e.target.value})}>
                  {cats.filter(c=>c!=='All').map(c=><option key={c}>{c}</option>)}
                </select>
                <select className="note-input" value={draft.priority} onChange={e=>setDraft({...draft,priority:e.target.value})}>
                  <option value="low">Low priority</option>
                  <option value="normal">Normal</option>
                  <option value="high">High priority</option>
                </select>
                <input className="note-input" placeholder="Linked to (optional)" value={draft.linkedTo} onChange={e=>setDraft({...draft,linkedTo:e.target.value})}/>
              </div>
              <textarea className="note-input body-area" style={{marginTop:14}} placeholder="Note details..." value={draft.body} onChange={e=>setDraft({...draft,body:e.target.value})}/>
              <div style={{display:'flex',gap:10,marginTop:16,justifyContent:'flex-end'}}>
                <button className="btn" onClick={()=>setAdding(false)} disabled={saving}>Cancel</button>
                <button className="btn gold" onClick={addNote} disabled={saving || !draft.title.trim() || !draft.staff.trim()}>{saving ? 'Saving…' : 'Save note'}</button>
              </div>
            </>
          ) : selected ? (
            <>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                {selected.priority === 'high' && <span className="pill danger">High priority</span>}
                <span className="pill gold">{selected.category}</span>
                <span style={{flex:1}}/>
                <button className="btn ghost sm" style={{color:'var(--danger)'}} onClick={deleteSelected}><Icon name="trash" size={14}/></button>
              </div>
              <h2>{selected.title}</h2>
              <div className="meta-row">
                <div className="item"><span className="k">Staff</span><span className="v">{selected.staff}</span></div>
                <div className="item"><span className="k">Date</span><span className="v">{selected.created ? fmtDate(selected.created) : '—'}</span></div>
                <div className="item"><span className="k">Linked to</span><span className="v">{selected.linkedTo || '—'}</span></div>
                <div className="item"><span className="k">Note ID</span><span className="v" style={{fontFamily:'monospace',fontSize:12}}>#{String(selected.id).slice(-6)}</span></div>
              </div>
              <div className="body-text">{selected.body}</div>
            </>
          ) : (
            <div className="placeholder" style={{border:'none'}}>
              <p>Select a note to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============ CALENDAR ============
const CalendarPage = () => {
  const [view, setView] = React.useState('week');
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = [4, 5, 6, 7, 8, 9, 10];
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const HOUR_PX = 56;
  const startHour = 8;

  return (
    <div>
      <div className="cal-toolbar">
        <button className="btn"><Icon name="chevron" size={14} style={{transform:'rotate(180deg)'}}/></button>
        <div style={{fontFamily:"'Cormorant Garamond', serif",fontSize:24,fontWeight:500,letterSpacing:'-.01em'}}>May 2026</div>
        <button className="btn"><Icon name="chevron" size={14}/></button>
        <button className="btn ghost sm">Today</button>
        <div style={{flex:1}}/>
        <div className="cal-views">
          {['day','week','month'].map(v => (
            <button key={v} className={view===v?'active':''} onClick={()=>setView(v)}>
              {v.charAt(0).toUpperCase()+v.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn gold"><Icon name="plus" size={14}/>New event</button>
      </div>

      {view === 'week' && (
        <div className="cal-week">
          <div className="cal-week-grid">
            <div></div>
            {days.map((d, i) => (
              <div key={d} className={`cal-day-head ${i===0?'today':''}`}>
                <div className="dow">{d}</div>
                <div className="dnum">{dates[i]}</div>
              </div>
            ))}
          </div>
          <div className="cal-week-grid" style={{position:'relative'}}>
            <div className="cal-time-col">
              {hours.map(h => <div key={h} className="cal-time-slot">{String(h).padStart(2,'0')}:00</div>)}
            </div>
            {days.map((d, i) => (
              <div key={d} className="cal-day-col">
                {hours.map((h, hi) => <div key={h} className="cal-grid-line" style={{top: hi*HOUR_PX}}/>)}
                {SAMPLE_EVENTS.filter(e => e.day === i+1).map((e, ei) => (
                  <div
                    key={ei}
                    className={`cal-event ${e.type}`}
                    style={{ top: (e.start - startHour)*HOUR_PX + 1, height: (e.end - e.start)*HOUR_PX - 2 }}
                    onClick={()=>setSelectedEvent(e)}
                  >
                    <div className="t">{e.title}</div>
                    <div className="m">{fmtTime(e.start)} – {fmtTime(e.end)} · {e.staff}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'day' && (
        <div className="cal-week">
          <div className="cal-week-grid" style={{gridTemplateColumns:'56px 1fr'}}>
            <div></div>
            <div className="cal-day-head today" style={{borderLeft:'none'}}>
              <div className="dow">Monday</div>
              <div className="dnum">4 May</div>
            </div>
          </div>
          <div className="cal-week-grid" style={{gridTemplateColumns:'56px 1fr',position:'relative'}}>
            <div className="cal-time-col">
              {hours.map(h => <div key={h} className="cal-time-slot">{String(h).padStart(2,'0')}:00</div>)}
            </div>
            <div className="cal-day-col" style={{borderLeft:'none'}}>
              {hours.map((h, hi) => <div key={h} className="cal-grid-line" style={{top: hi*HOUR_PX}}/>)}
              {SAMPLE_EVENTS.filter(e => e.day === 1).map((e, ei) => (
                <div
                  key={ei}
                  className={`cal-event ${e.type}`}
                  style={{ top: (e.start - startHour)*HOUR_PX + 1, height: (e.end - e.start)*HOUR_PX - 2, left:8, right:8, padding:'10px 14px' }}
                  onClick={()=>setSelectedEvent(e)}
                >
                  <div className="t" style={{fontSize:14}}>{e.title}</div>
                  <div className="m">{fmtTime(e.start)} – {fmtTime(e.end)} · {e.staff}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'month' && (
        <div className="cal-month">
          <div className="cal-month-grid">
            {days.map(d => <div key={d} className="cal-month-dow">{d}</div>)}
            {Array.from({length: 35}).map((_, i) => {
              const day = i - 3; // May 1 = Friday (index 4)
              const inMonth = day >= 1 && day <= 31;
              const isToday = day === 4;
              const weekIdx = day >= 4 && day <= 10 ? day - 3 : null;
              const evts = weekIdx ? SAMPLE_EVENTS.filter(e => e.day === weekIdx).slice(0, 3) : [];
              return (
                <div key={i} className={`cal-month-cell ${!inMonth?'muted':''} ${isToday?'today':''}`}>
                  <div className="num">{inMonth ? day : ''}</div>
                  {evts.map((e, ei) => (
                    <div key={ei} className="cal-month-evt" onClick={()=>setSelectedEvent(e)}>{fmtTime(e.start)} {e.title}</div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{display:'flex',gap:16,marginTop:16,flexWrap:'wrap',fontSize:12.5,color:'var(--ink-mute)'}}>
        {[
          {l:'Funeral',c:'var(--gold)'},
          {l:'Viewing',c:'#a88547'},
          {l:'Arrangement',c:'var(--ink-mute)'},
          {l:'Delivery',c:'var(--gold-deep)'},
          {l:'Internal',c:'var(--ink-faint)'},
          {l:'Reminder',c:'var(--danger)'},
        ].map(x => (
          <div key={x.l} style={{display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:10,height:10,borderRadius:2,background:x.c}}/>{x.l}
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="panel-overlay" onClick={()=>setSelectedEvent(null)}>
          <div className="panel" style={{width:'min(480px, 94vw)'}} onClick={e=>e.stopPropagation()}>
            <div className="panel-head">
              <h3>{selectedEvent.title}</h3>
              <button className="icon-btn" onClick={()=>setSelectedEvent(null)}><Icon name="close" size={16}/></button>
            </div>
            <div className="panel-body">
              <div style={{display:'grid',gap:14}}>
                <div><div style={{fontSize:11,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--ink-mute)'}}>Time</div>
                  <div style={{fontSize:16,fontFamily:"'Cormorant Garamond',serif"}}>{fmtTime(selectedEvent.start)} – {fmtTime(selectedEvent.end)}</div>
                </div>
                <div><div style={{fontSize:11,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--ink-mute)'}}>Type</div>
                  <span className="pill gold" style={{textTransform:'capitalize'}}>{selectedEvent.type}</span>
                </div>
                <div><div style={{fontSize:11,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--ink-mute)'}}>Assigned</div>
                  <div>{selectedEvent.staff}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============ STOCK ============
const StockPage = () => {
  const [sortBy, setSortBy] = React.useState('qty');
  const [sortDir, setSortDir] = React.useState('asc');
  const [cat, setCat] = React.useState('All');
  const [lowOnly, setLowOnly] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const cats = ['All', ...Array.from(new Set(SAMPLE_STOCK.map(s => s.category)))];

  const filtered = SAMPLE_STOCK.filter(s => {
    if (cat !== 'All' && s.category !== cat) return false;
    if (lowOnly && s.qty > s.reorder) return false;
    if (query && !(s.name+s.supplier).toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    let av = a[sortBy], bv = b[sortBy];
    if (typeof av === 'string') { av = av.toLowerCase(); bv = bv.toLowerCase(); }
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
  };

  const arrow = (col) => sortBy === col ? <span className="arrow">{sortDir==='asc'?'↑':'↓'}</span> : null;

  const lowCount = SAMPLE_STOCK.filter(s => s.qty <= s.reorder).length;

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:18,flexWrap:'wrap'}}>
        <p style={{margin:0,color:'var(--ink-mute)',fontSize:14,flex:1,minWidth:200}}>
          Connected to <b style={{color:'var(--gold-deep)'}}>Google Sheets · DCFS_Inventory_2026</b>. Last sync 7 minutes ago.
        </p>
        <button className="btn"><Icon name="sheets" size={14}/>Open in Sheets</button>
        <button className="btn gold"><Icon name="plus" size={14}/>Add item</button>
      </div>

      <div className="kpi-row">
        <div className="kpi accent"><div className="label">Total items</div><div className="value">{SAMPLE_STOCK.length}</div><div className="delta">across 6 categories</div></div>
        <div className="kpi"><div className="label">Low / critical</div><div className="value">{lowCount}</div><div className="delta">below reorder level</div></div>
        <div className="kpi"><div className="label">Stock value</div><div className="value">£12,4k</div><div className="delta">at current cost</div></div>
        <div className="kpi"><div className="label">Open orders</div><div className="value">3</div><div className="delta">expected this week</div></div>
      </div>

      <div className="stock-toolbar">
        <div className="search-box" style={{width:280}}>
          <Icon name="search" size={16}/>
          <input placeholder="Search items, suppliers..." value={query} onChange={e=>setQuery(e.target.value)}/>
        </div>
        <div className="chip-group">
          {cats.map(c => (
            <span key={c} className={`chip ${cat===c?'active':''}`} onClick={()=>setCat(c)}>{c}</span>
          ))}
        </div>
        <span className={`chip ${lowOnly?'active':''}`} onClick={()=>setLowOnly(!lowOnly)} style={{borderColor: lowOnly?'var(--danger)':undefined, background: lowOnly?'var(--danger)':undefined}}>
          {lowOnly?'✓ ':''}Low stock only
        </span>
      </div>

      <div className="table-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th onClick={()=>toggleSort('name')}>Item {arrow('name')}</th>
              <th onClick={()=>toggleSort('category')}>Category {arrow('category')}</th>
              <th className="num" onClick={()=>toggleSort('qty')}>Qty {arrow('qty')}</th>
              <th className="num" onClick={()=>toggleSort('reorder')}>Reorder at {arrow('reorder')}</th>
              <th onClick={()=>toggleSort('supplier')}>Supplier {arrow('supplier')}</th>
              <th className="num" onClick={()=>toggleSort('cost')}>Unit cost {arrow('cost')}</th>
              <th onClick={()=>toggleSort('updated')}>Updated {arrow('updated')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => {
              const low = s.qty <= s.reorder;
              return (
                <tr key={s.id}>
                  <td style={{fontWeight:500}}>{s.name}</td>
                  <td><span className="pill">{s.category}</span></td>
                  <td className={`num ${low?'low':''}`}>{s.qty}{low && ' ⚠'}</td>
                  <td className="num" style={{color:'var(--ink-mute)'}}>{s.reorder}</td>
                  <td style={{color:'var(--ink-soft)'}}>{s.supplier}</td>
                  <td className="num">£{s.cost.toFixed(2)}</td>
                  <td style={{color:'var(--ink-mute)',fontSize:12.5}}>{fmtDate(s.updated)}</td>
                  <td>{low ? <span className="pill danger">Reorder</span> : <span className="pill ok">OK</span>}</td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan="8" style={{textAlign:'center',padding:40,color:'var(--ink-faint)'}}>No items match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============ FILES ============
const FilesPage = () => {
  const groups = [
    { name: 'Wilson — Margaret Anne', count: 8, type: 'Funeral arrangement' },
    { name: 'Hartley — Thomas Edward', count: 6, type: 'Funeral arrangement' },
    { name: 'Doherty — Elsie May', count: 5, type: 'Funeral arrangement' },
    { name: 'McKee — Robert John', count: 4, type: 'Funeral arrangement' },
    { name: 'Quinn — Brenda', count: 3, type: 'Funeral arrangement' },
    { name: 'Connolly — William', count: 2, type: 'Funeral arrangement' },
    { name: 'Insurance documents', count: 23, type: 'Business' },
    { name: 'Compliance & licensing', count: 14, type: 'Business' },
  ];
  return (
    <div>
      <div className="drop-zone">
        <div style={{display:'flex',alignItems:'center',gap:14,justifyContent:'center'}}>
          <Icon name="upload" size={22}/>
          <div>
            <div className="big">Drag and drop files here</div>
            <div>or <a style={{color:'var(--gold-deep)'}}>browse</a> · PDF, JPG, PNG, DOCX up to 25 MB</div>
          </div>
        </div>
      </div>
      <div className="tabs">
        {['All files','By family','Business documents','Recent uploads','Tagged'].map((t,i)=>(
          <button key={t} className={`tab ${i===1?'active':''}`}>{t}</button>
        ))}
      </div>
      <div className="files-grid">
        {groups.map((g,i) => (
          <div key={i} className="file-card">
            <div className="thumb"><Icon name="files" size={28}/></div>
            <div className="nm">{g.name}</div>
            <div className="mt">{g.count} files · {g.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ INTEGRATIONS / QUICK LAUNCH PAGE ============
const IntegrationsPage = ({ onOpenLaunch }) => {
  const internal = QUICK_LAUNCH.filter(q => q.group === 'internal');
  const external = QUICK_LAUNCH.filter(q => q.group === 'external');
  return (
    <div>
      <p style={{color:'var(--ink-mute)',marginTop:0,marginBottom:24,fontSize:14,maxWidth:680}}>
        Quick access to staff forms, PDFs, and external tools. Tiles marked <span className="pill gold" style={{verticalAlign:'middle'}}>Embed</span> open inside the dashboard; everything else opens in a new tab.
      </p>
      <div className="ql-section">
        <h3>Business areas &amp; staff forms</h3>
        <div className="ql-grid-lg">
          {internal.map((q,i)=>(
            <button key={i} className="ql-tile-lg" onClick={()=>onOpenLaunch(q)}>
              <span className="ico-lg"><Icon name={q.icon} size={22}/></span>
              <div style={{display:'flex',alignItems:'center',gap:6}}>
                <div className="lbl">{q.label}</div>
                {q.embed ? <span className="pill gold" style={{padding:'1px 7px',fontSize:10}}>Embed</span> : <Icon name="link" size={12} style={{color:'var(--ink-faint)'}}/>}
              </div>
              <div className="desc" style={{marginTop:'auto'}}>{q.desc || ''}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="ql-section">
        <h3>External tools &amp; integrations</h3>
        <div className="ql-grid-lg">
          {external.map((q,i)=>(
            <button key={i} className="ql-tile-lg external" onClick={()=>onOpenLaunch(q)}>
              <span className="ico-lg"><Icon name={q.icon} size={22}/></span>
              <div style={{display:'flex',alignItems:'center',gap:6}}>
                <div className="lbl">{q.label}</div>
                <Icon name="link" size={12} style={{color:'var(--ink-faint)'}}/>
              </div>
              <div className="desc" style={{marginTop:'auto'}}>{q.desc || ''}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============ GENERIC PLACEHOLDER ============
const PlaceholderSection = ({ title, body, iconName }) => (
  <div className="placeholder">
    <div className="icon-circle"><Icon name={iconName} size={26}/></div>
    <h3>{title}</h3>
    <p>{body}</p>
    <div style={{marginTop:18,display:'flex',gap:10,justifyContent:'center'}}>
      <button className="btn">Learn more</button>
      <button className="btn gold">Coming soon</button>
    </div>
  </div>
);

Object.assign(window, {
  DashboardHome, NotesPage, CalendarPage, StockPage, FilesPage, IntegrationsPage, PlaceholderSection,
  fmtDate, fmtTime,
});
