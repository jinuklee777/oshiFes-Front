// dk-app.jsx — Root App component + React mount

const { useState } = React;

const App = () => {
  const [screen, setScreen] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setScreen('detail');
  };

  const handleBack = () => {
    setScreen('home');
  };

  return (
    <IOSDevice dark={false}>
      <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* Home screen — slides left when detail opens */}
        <div style={{
          position: 'absolute', inset: 0,
          transform: screen === 'home' ? 'translateX(0)' : 'translateX(-30%)',
          transition: 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: screen === 'home' ? 1 : 0.4,
          willChange: 'transform',
        }}>
          <HomeScreen
            events={DK_EVENTS}
            birthday={DK_BIRTHDAY}
            calendarDots={DK_CALENDAR_DOTS}
            onEventClick={handleEventClick}
          />
        </div>

        {/* Detail screen — slides in from right */}
        <div style={{
          position: 'absolute', inset: 0,
          transform: screen === 'detail' ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}>
          <DetailScreen
            event={selectedEvent}
            onBack={handleBack}
          />
        </div>
      </div>
    </IOSDevice>
  );
};

const AppWrapper = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(145deg, #E8EBF4 0%, #F0ECF8 100%)',
    padding: '40px 20px',
    fontFamily: 'Pretendard, sans-serif',
  }}>
    <App />
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />);
