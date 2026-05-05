// dk-components.jsx — Shared UI components for 덕력캘린더

// ─── SVG Icon Components ──────────────────────────────────────

const IconBack = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M14 5L8 11L14 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSearch = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="9.5" cy="9.5" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M13.5 13.5L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const IconBell = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 3C8.24 3 6 5.24 6 8v4.5L4 15h14l-2-2.5V8c0-2.76-2.24-5-5-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M9 18.5a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const IconBookmarkOutline = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M6 3h10v16.5l-5-3.5-5 3.5V3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
);

const IconBookmarkFilled = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
    <path d="M6 3h10v16.5l-5-3.5-5 3.5V3z"/>
  </svg>
);

const IconShare = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 4v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M7.5 7.5L11 4l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 14v4h14v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconCalSmall = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <rect x="1.5" y="2" width="10" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M1.5 5.5h10" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M4.5 1v2M8.5 1v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconPinSmall = () => (
  <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
    <path d="M5.5 1C3.57 1 2 2.57 2 4.5c0 2.7 3.5 7.5 3.5 7.5S9 7.2 9 4.5C9 2.57 7.43 1 5.5 1z" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="5.5" cy="4.5" r="1.3" stroke="currentColor" strokeWidth="1.1"/>
  </svg>
);

const IconChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Event Poster ─────────────────────────────────────────────

const DKEventPoster = ({ event, height = 200, showTitle = true }) => {
  const { ipColor, ipColorDark, ip, shortTitle, urgencyLabel, startDate, endDate, location } = event;

  return (
    <div style={{
      width: '100%',
      height,
      background: `linear-gradient(148deg, ${ipColorDark} 0%, ${ipColor} 65%)`,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'inherit',
    }}>
      {/* Large decorative circle top-right */}
      <div style={{
        position: 'absolute',
        top: -height * 0.35,
        right: -height * 0.22,
        width: height * 1.05,
        height: height * 1.05,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.07)',
        pointerEvents: 'none',
      }} />
      {/* Small decorative circle bottom-left */}
      <div style={{
        position: 'absolute',
        bottom: -height * 0.12,
        left: -height * 0.15,
        width: height * 0.62,
        height: height * 0.62,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        pointerEvents: 'none',
      }} />
      {/* IP name texture */}
      <div style={{
        position: 'absolute',
        right: 10,
        bottom: showTitle ? height * 0.28 : -6,
        fontSize: Math.max(height * 0.23, 28),
        fontWeight: 900,
        color: 'rgba(255,255,255,0.08)',
        letterSpacing: -1.5,
        fontFamily: 'Pretendard, sans-serif',
        lineHeight: 1,
        userSelect: 'none',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        {ip}
      </div>

      {showTitle && (
        <>
          {/* Bottom gradient overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '62%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)',
            pointerEvents: 'none',
          }} />
          {/* Title + date/location badges */}
          <div style={{
            position: 'absolute',
            bottom: 12, left: 14, right: 14,
          }}>
            <p style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.35,
              margin: '0 0 6px',
              fontFamily: 'Pretendard, sans-serif',
              textShadow: '0 1px 4px rgba(0,0,0,0.35)',
            }}>
              {shortTitle}
            </p>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(6px)',
                color: 'rgba(255,255,255,0.92)',
                fontSize: 10,
                fontWeight: 500,
                padding: '2px 8px',
                borderRadius: 4,
                fontFamily: 'Pretendard, sans-serif',
              }}>
                {startDate} ~ {endDate}
              </span>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(6px)',
                color: 'rgba(255,255,255,0.92)',
                fontSize: 10,
                fontWeight: 500,
                padding: '2px 8px',
                borderRadius: 4,
                fontFamily: 'Pretendard, sans-serif',
              }}>
                {location}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Big Event Card (urgent, full-width) ──────────────────────

const DKBigEventCard = ({ event, onClick }) => (
  <div
    onClick={() => onClick(event)}
    style={{
      width: '100%',
      background: '#fff',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 3px 18px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
      cursor: 'pointer',
      position: 'relative',
    }}
  >
    <DKEventPoster event={event} height={218} showTitle={true} />
    {/* Urgency chip — top left */}
    {event.urgencyLabel && (
      <div style={{
        position: 'absolute',
        top: 12, left: 12,
        background: event.urgencyLabel === '오늘 마감' ? '#FF3B30' : '#FF9500',
        color: '#fff',
        fontSize: 11,
        fontWeight: 700,
        padding: '4px 10px',
        borderRadius: 6,
        letterSpacing: 0.2,
        fontFamily: 'Pretendard, sans-serif',
        boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
      }}>
        {event.urgencyLabel}
      </div>
    )}
  </div>
);

// ─── Small Horizontal Card ────────────────────────────────────

const DKSmallEventCard = ({ event, onClick }) => (
  <div
    onClick={() => onClick(event)}
    style={{
      width: 158,
      background: '#fff',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
      cursor: 'pointer',
      flexShrink: 0,
    }}
  >
    <DKEventPoster event={event} height={118} showTitle={true} />
    <div style={{ padding: '9px 11px 10px' }}>
      <p style={{
        margin: 0,
        fontSize: 11,
        fontWeight: 700,
        color: '#1a1a1a',
        lineHeight: 1.35,
        fontFamily: 'Pretendard, sans-serif',
      }}>
        {event.ipKo}
      </p>
      {event.urgencyLabel && (
        <span style={{
          display: 'inline-block',
          marginTop: 4,
          background: event.urgencyLabel === '오늘 마감' ? '#FFF0EF' : '#FFF4E5',
          color: event.urgencyLabel === '오늘 마감' ? '#FF3B30' : '#FF9500',
          fontSize: 10,
          fontWeight: 700,
          padding: '2px 7px',
          borderRadius: 4,
          fontFamily: 'Pretendard, sans-serif',
        }}>
          {event.urgencyLabel}
        </span>
      )}
    </div>
  </div>
);

// ─── List Event Card (thumbnail left + info right) ────────────

const DKListEventCard = ({ event, onClick }) => (
  <div
    onClick={() => onClick(event)}
    style={{
      display: 'flex',
      background: '#fff',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 1px 8px rgba(0,0,0,0.07)',
      cursor: 'pointer',
    }}
  >
    {/* Left: poster thumbnail */}
    <div style={{ width: 88, flexShrink: 0 }}>
      <DKEventPoster event={event} height={88} showTitle={false} />
    </div>
    {/* Right: text info */}
    <div style={{
      flex: 1,
      padding: '11px 12px 11px 12px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minWidth: 0,
    }}>
      <span style={{
        display: 'inline-block',
        alignSelf: 'flex-start',
        background: `${event.ipColor}1A`,
        color: event.ipColor,
        fontSize: 10,
        fontWeight: 600,
        padding: '2px 7px',
        borderRadius: 4,
        marginBottom: 5,
        fontFamily: 'Pretendard, sans-serif',
      }}>
        {event.type}
      </span>
      <p style={{
        margin: '0 0 5px',
        fontSize: 13,
        fontWeight: 700,
        color: '#1a1a1a',
        lineHeight: 1.35,
        fontFamily: 'Pretendard, sans-serif',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {event.shortTitle}
      </p>
      <div style={{
        display: 'flex',
        gap: 4,
        alignItems: 'center',
        color: '#9e9e9e',
        fontSize: 11,
        fontFamily: 'Pretendard, sans-serif',
      }}>
        <IconCalSmall />
        <span>{event.startDate} ~ {event.endDate}</span>
        <span style={{ color: '#d8d8d8', margin: '0 1px' }}>·</span>
        <IconPinSmall />
        <span style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {event.location}
        </span>
      </div>
    </div>
  </div>
);

// ─── Birthday Banner ──────────────────────────────────────────

const DKBirthdayBanner = ({ birthday }) => {
  const { characterName, series, ipColor, ipColorDark, date } = birthday;
  return (
    <div style={{
      borderRadius: 16,
      overflow: 'hidden',
      background: ipColor,
      boxShadow: `0 6px 24px ${ipColor}50`,
      position: 'relative',
    }}>
      {/* Decorative circle top-right */}
      <div style={{
        position: 'absolute',
        top: -36, right: -18,
        width: 130, height: 130,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.09)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -22, right: 70,
        width: 72, height: 72,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)',
        pointerEvents: 'none',
      }} />
      {/* Thin accent bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        background: 'rgba(255,255,255,0.25)',
      }} />
      <div style={{ padding: '15px 20px 16px', position: 'relative' }}>
        <p style={{
          margin: '0 0 3px',
          fontSize: 9,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.65)',
          letterSpacing: 2,
          textTransform: 'uppercase',
          fontFamily: 'Pretendard, sans-serif',
        }}>
          오늘의 생일
        </p>
        <p style={{
          margin: '0 0 6px',
          fontSize: 28,
          fontWeight: 900,
          color: '#fff',
          letterSpacing: -1.2,
          lineHeight: 1.1,
          fontFamily: 'Pretendard, sans-serif',
        }}>
          {characterName}
        </p>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          <span style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.75)',
            fontFamily: 'Pretendard, sans-serif',
          }}>
            {series}
          </span>
          <div style={{
            width: 3, height: 3, borderRadius: '50%',
            background: 'rgba(255,255,255,0.4)',
          }} />
          <span style={{
            fontSize: 12,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'Pretendard, sans-serif',
          }}>
            {date}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── Mini Calendar ────────────────────────────────────────────

const DK_DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

const DKMiniCalendar = ({ calendarDots, today = 29 }) => {
  // April 2026: April 1 = Wednesday (index 3), 30 days
  const firstDayIndex = 3;
  const daysInMonth = 30;
  const cells = [];
  for (let i = 0; i < firstDayIndex; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={{ padding: '0 14px' }}>
      {/* Month navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
      }}>
        <button style={{
          background: 'none', border: 'none', padding: '4px 6px',
          cursor: 'pointer', color: '#c0c0c0', display: 'flex', alignItems: 'center',
        }}>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
            <path d="M7 1L1 6.5L7 12" stroke="#c0c0c0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span style={{
          fontSize: 15,
          fontWeight: 700,
          color: '#1a1a1a',
          fontFamily: 'Pretendard, sans-serif',
          letterSpacing: -0.3,
        }}>
          2026년 4월
        </span>
        <button style={{
          background: 'none', border: 'none', padding: '4px 6px',
          cursor: 'pointer', color: '#c0c0c0', display: 'flex', alignItems: 'center',
        }}>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
            <path d="M1 1L7 6.5L1 12" stroke="#c0c0c0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Day name headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        marginBottom: 2,
      }}>
        {DK_DAY_LABELS.map((label, i) => (
          <div key={i} style={{
            textAlign: 'center',
            fontSize: 11,
            fontWeight: 600,
            color: i === 0 ? '#FF6B9D' : i === 6 ? '#A78BFA' : '#c0c0c0',
            padding: '2px 0 5px',
            fontFamily: 'Pretendard, sans-serif',
          }}>
            {label}
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
      }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} style={{ height: 40 }} />;

          const isToday = day === today;
          const dots = calendarDots[day] || [];
          const col = (firstDayIndex + day - 1) % 7;
          const isSun = col === 0;
          const isSat = col === 6;

          return (
            <div key={day} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: 40,
              justifyContent: 'flex-start',
              paddingTop: 2,
            }}>
              <div style={{
                width: 28,
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: isToday ? '#FF6B9D' : 'transparent',
              }}>
                <span style={{
                  fontSize: 13,
                  fontWeight: isToday ? 700 : 400,
                  color: isToday
                    ? '#fff'
                    : isSun ? '#FF6B9D'
                    : isSat ? '#A78BFA'
                    : '#2a2a2a',
                  fontFamily: 'Pretendard, sans-serif',
                  lineHeight: 1,
                }}>
                  {day}
                </span>
              </div>
              {/* IP color dots */}
              <div style={{
                display: 'flex',
                gap: 2,
                height: 5,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 1,
              }}>
                {dots.slice(0, 3).map((color, di) => (
                  <div key={di} style={{
                    width: 4, height: 4,
                    borderRadius: '50%',
                    background: color,
                    flexShrink: 0,
                  }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Bottom Tab Bar ───────────────────────────────────────────

const DKTabBar = ({ activeTab = 'home', onTabChange }) => {
  const pink = '#FF6B9D';
  const gray = '#c0c0c0';

  const tabs = [
    {
      id: 'home', label: '홈',
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 10.5L11 3L19 10.5V19H14v-5H8v5H3V10.5z"
            fill={a ? `${pink}22` : 'none'}
            stroke={a ? pink : gray}
            strokeWidth="1.6" strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'calendar', label: '캘린더',
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2.5" y="3.5" width="17" height="15" rx="3"
            fill={a ? `${pink}15` : 'none'}
            stroke={a ? pink : gray} strokeWidth="1.6"
          />
          <path d="M2.5 8.5h17" stroke={a ? pink : gray} strokeWidth="1.6"/>
          <path d="M7 2v3M15 2v3" stroke={a ? pink : gray} strokeWidth="1.6" strokeLinecap="round"/>
          <circle cx="7.5" cy="13" r="1" fill={a ? pink : gray}/>
          <circle cx="11" cy="13" r="1" fill={a ? pink : gray}/>
          <circle cx="14.5" cy="13" r="1" fill={a ? pink : gray}/>
        </svg>
      ),
    },
    {
      id: 'saved', label: '찜',
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M5 3h12v17l-6-4.2-6 4.2V3z"
            fill={a ? pink : 'none'}
            stroke={a ? pink : gray}
            strokeWidth="1.6" strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'my', label: 'MY',
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="8" r="3.5"
            fill={a ? `${pink}22` : 'none'}
            stroke={a ? pink : gray} strokeWidth="1.6"
          />
          <path d="M3 19.5c0-3.87 3.58-7 8-7s8 3.13 8 7"
            stroke={a ? pink : gray} strokeWidth="1.6" strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      display: 'flex',
      borderTop: '1px solid #F0F0F0',
      background: '#fff',
      paddingTop: 5,
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange && onTabChange(tab.id)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            padding: '5px 0 6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {tab.icon(activeTab === tab.id)}
          <span style={{
            fontSize: 10,
            fontWeight: activeTab === tab.id ? 700 : 500,
            color: activeTab === tab.id ? pink : gray,
            fontFamily: 'Pretendard, sans-serif',
          }}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};

// ─── Section Header ───────────────────────────────────────────

const DKSectionHeader = ({ title, count, showAll }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
    marginBottom: 10,
  }}>
    <div style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
      <span style={{
        fontSize: 15,
        fontWeight: 800,
        color: '#1a1a1a',
        fontFamily: 'Pretendard, sans-serif',
        letterSpacing: -0.4,
      }}>
        {title}
      </span>
      {count != null && (
        <span style={{
          fontSize: 13,
          fontWeight: 700,
          color: '#FF6B9D',
          fontFamily: 'Pretendard, sans-serif',
        }}>
          {count}
        </span>
      )}
    </div>
    {showAll && (
      <button style={{
        background: 'none', border: 'none', padding: 0,
        cursor: 'pointer', display: 'flex', alignItems: 'center',
        gap: 1, color: '#b0b0b0', fontSize: 12,
        fontFamily: 'Pretendard, sans-serif',
      }}>
        전체보기 <IconChevronRight />
      </button>
    )}
  </div>
);

Object.assign(window, {
  IconBack, IconSearch, IconBell,
  IconBookmarkOutline, IconBookmarkFilled,
  IconShare, IconCalSmall, IconPinSmall, IconChevronRight,
  DKEventPoster, DKBigEventCard, DKSmallEventCard, DKListEventCard,
  DKBirthdayBanner, DKMiniCalendar, DKTabBar, DKSectionHeader,
});
