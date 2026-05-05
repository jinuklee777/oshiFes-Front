// dk-screens.jsx — HomeScreen and DetailScreen

const HomeScreen = ({ events, birthday, calendarDots, onEventClick }) => {
  const urgentEvents = events.filter(e => e.isUrgent);
  const upcomingEvents = events.filter(e => !e.isUrgent);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#FAFAFA',
    }}>
      {/* Status bar spacer */}
      <div style={{ height: 59, flexShrink: 0, background: '#FAFAFA' }} />

      {/* App Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px 18px 12px',
        background: '#FAFAFA',
        flexShrink: 0,
      }}>
        <div>
          <p style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 900,
            color: '#1a1a1a',
            letterSpacing: -1,
            fontFamily: 'Pretendard, sans-serif',
          }}>
            덕력캘린더
          </p>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <button style={{
            background: 'none', border: 'none', padding: 0,
            cursor: 'pointer', color: '#3a3a3a', display: 'flex',
          }}>
            <IconSearch />
          </button>
          <button style={{
            background: 'none', border: 'none', padding: 0,
            cursor: 'pointer', color: '#3a3a3a', display: 'flex',
            position: 'relative',
          }}>
            <IconBell />
            {/* Notification dot */}
            <div style={{
              position: 'absolute',
              top: 0, right: 0,
              width: 7, height: 7,
              borderRadius: '50%',
              background: '#FF6B9D',
              border: '1.5px solid #FAFAFA',
            }} />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}>
        {/* Calendar card */}
        <div style={{
          background: '#fff',
          margin: '0 16px 12px',
          borderRadius: 16,
          padding: '16px 2px 14px',
          boxShadow: '0 1px 10px rgba(0,0,0,0.06)',
        }}>
          <DKMiniCalendar calendarDots={calendarDots} today={29} />
        </div>

        {/* Birthday Banner */}
        <div style={{ margin: '0 16px 18px' }}>
          <DKBirthdayBanner birthday={birthday} />
        </div>

        {/* Urgent section */}
        {urgentEvents.length > 0 && (
          <div style={{ marginBottom: 22 }}>
            <DKSectionHeader title="오늘 마감 임박" count={urgentEvents.length} />

            {/* Hero card — first urgent */}
            <div style={{ padding: '0 16px', marginBottom: 10 }}>
              <DKBigEventCard event={urgentEvents[0]} onClick={onEventClick} />
            </div>

            {/* Horizontal scroll — rest urgent */}
            {urgentEvents.length > 1 && (
              <div style={{
                display: 'flex',
                gap: 10,
                overflowX: 'auto',
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 2,
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}>
                {urgentEvents.slice(1).map(event => (
                  <DKSmallEventCard key={event.id} event={event} onClick={onEventClick} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Upcoming section */}
        <div style={{ marginBottom: 20 }}>
          <DKSectionHeader title="다가오는 행사" showAll={true} />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: '0 16px',
          }}>
            {upcomingEvents.map(event => (
              <DKListEventCard key={event.id} event={event} onClick={onEventClick} />
            ))}
          </div>
        </div>

        <div style={{ height: 12 }} />
      </div>

      {/* Bottom Tab Bar */}
      <div style={{ flexShrink: 0 }}>
        <DKTabBar activeTab="home" />
      </div>
      {/* Home indicator spacer */}
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────

const DetailScreen = ({ event, onBack }) => {
  const [bookmarked, setBookmarked] = React.useState(false);
  if (!event) return null;

  const isUrgentToday = event.urgencyLabel === '오늘 마감';
  const urgencyColor = isUrgentToday ? '#FF3B30' : '#FF9500';
  const urgencyBg = isUrgentToday ? '#FFF0EF' : '#FFF4E5';

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#FAFAFA',
    }}>
      {/* Full-bleed poster header */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <DKEventPoster event={event} height={310} showTitle={false} />

        {/* Top gradient for status bar legibility */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Bottom sheet pull-up curve */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0, height: 28,
          background: '#fff',
          borderRadius: '20px 20px 0 0',
        }} />

        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: 64, left: 16,
            width: 36, height: 36,
            background: 'rgba(0,0,0,0.32)',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            backdropFilter: 'blur(10px)',
          }}
        >
          <IconBack />
        </button>

        {/* Action buttons top-right */}
        <div style={{
          position: 'absolute',
          top: 64, right: 16,
          display: 'flex', gap: 8,
        }}>
          <button
            onClick={() => setBookmarked(b => !b)}
            style={{
              width: 36, height: 36,
              background: 'rgba(0,0,0,0.32)',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: bookmarked ? '#FF6B9D' : '#fff',
              backdropFilter: 'blur(10px)',
            }}
          >
            {bookmarked ? <IconBookmarkFilled /> : <IconBookmarkOutline />}
          </button>
          <button style={{
            width: 36, height: 36,
            background: 'rgba(0,0,0,0.32)',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            backdropFilter: 'blur(10px)',
          }}>
            <IconShare />
          </button>
        </div>
      </div>

      {/* Scrollable detail content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        background: '#fff',
      }}>
        <div style={{ padding: '4px 20px 0' }}>

          {/* Badge row */}
          <div style={{ display: 'flex', gap: 7, marginBottom: 13, alignItems: 'center', flexWrap: 'wrap' }}>
            {event.urgencyLabel && (
              <span style={{
                background: urgencyBg,
                color: urgencyColor,
                fontSize: 12,
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 6,
                fontFamily: 'Pretendard, sans-serif',
              }}>
                {isUrgentToday ? 'D-0 · 오늘 마감' : `D-${event.daysLeft} · ${event.urgencyLabel}`}
              </span>
            )}
            <span style={{
              background: `${event.ipColor}1A`,
              color: event.ipColor,
              fontSize: 12,
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 6,
              fontFamily: 'Pretendard, sans-serif',
            }}>
              {event.type}
            </span>
          </div>

          {/* IP label */}
          <p style={{
            margin: '0 0 4px',
            fontSize: 12,
            fontWeight: 700,
            color: event.ipColor,
            letterSpacing: 0.5,
            fontFamily: 'Pretendard, sans-serif',
          }}>
            {event.ipKo}
          </p>

          {/* Event title */}
          <h1 style={{
            margin: '0 0 18px',
            fontSize: 22,
            fontWeight: 900,
            color: '#1a1a1a',
            lineHeight: 1.28,
            letterSpacing: -0.9,
            fontFamily: 'Pretendard, sans-serif',
          }}>
            {event.titleLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}{i < event.titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>

          {/* Date & Location */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 9,
            marginBottom: 20,
          }}>
            <div style={{
              display: 'flex', gap: 8, alignItems: 'center',
              color: '#5a5a5a', fontSize: 13,
              fontFamily: 'Pretendard, sans-serif',
            }}>
              <span style={{ color: '#b8b8b8', display: 'flex', alignItems: 'center' }}>
                <IconCalSmall />
              </span>
              <span style={{ fontWeight: 500 }}>
                {event.startDate} ~ {event.endDate}
              </span>
            </div>
            <div style={{
              display: 'flex', gap: 8, alignItems: 'center',
              color: '#5a5a5a', fontSize: 13,
              fontFamily: 'Pretendard, sans-serif',
            }}>
              <span style={{ color: '#b8b8b8', display: 'flex', alignItems: 'center' }}>
                <IconPinSmall />
              </span>
              <span style={{ fontWeight: 500 }}>{event.location}</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#F3F3F3', marginBottom: 20 }} />

          {/* Description */}
          <div style={{ marginBottom: 20 }}>
            <p style={{
              margin: '0 0 9px',
              fontSize: 13,
              fontWeight: 700,
              color: '#1a1a1a',
              fontFamily: 'Pretendard, sans-serif',
            }}>
              행사 소개
            </p>
            <p style={{
              margin: 0,
              fontSize: 13,
              color: '#5a5a5a',
              lineHeight: 1.75,
              fontFamily: 'Pretendard, sans-serif',
            }}>
              {event.description}
            </p>
          </div>

          {/* Tags */}
          <div style={{
            display: 'flex', gap: 6, flexWrap: 'wrap',
            marginBottom: 24,
          }}>
            {event.tags.map(tag => (
              <span key={tag} style={{
                background: '#F5F5F5',
                color: '#7a7a7a',
                fontSize: 12,
                fontWeight: 500,
                padding: '5px 12px',
                borderRadius: 20,
                fontFamily: 'Pretendard, sans-serif',
              }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <button
              onClick={() => setBookmarked(b => !b)}
              style={{
                flex: 1,
                padding: '14px 0',
                borderRadius: 12,
                border: `1.5px solid ${bookmarked ? '#FF6B9D' : '#EBEBEB'}`,
                background: bookmarked ? '#FFF0F6' : '#fff',
                color: bookmarked ? '#FF6B9D' : '#3a3a3a',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'Pretendard, sans-serif',
                transition: 'all 0.18s',
              }}
            >
              {bookmarked ? '저장됨' : '저장하기'}
            </button>
            <button style={{
              flex: 1,
              padding: '14px 0',
              borderRadius: 12,
              border: 'none',
              background: event.ipColor,
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'Pretendard, sans-serif',
            }}>
              공유하기
            </button>
          </div>
        </div>

        {/* Home indicator spacer */}
        <div style={{ height: 34, background: '#fff' }} />
      </div>
    </div>
  );
};

Object.assign(window, { HomeScreen, DetailScreen });
