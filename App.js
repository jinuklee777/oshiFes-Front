import React, { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { birthday, calendarDots, events } from './src/data/events';

const pink = '#FF6B9D';
const pageBg = '#FAFAFA';
const ink = '#1A1A1A';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [savedIds, setSavedIds] = useState(new Set());

  const savedEvents = useMemo(
    () => events.filter((event) => savedIds.has(event.id)),
    [savedIds]
  );

  const openEvent = (event) => {
    setSelectedEvent(event);
    setScreen('detail');
  };

  const toggleSaved = (id) => {
    setSavedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setScreen('home');
  };

  return (
    <SafeAreaProvider>
      <StatusBar style={screen === 'detail' ? 'light' : 'dark'} />
      {screen === 'detail' && selectedEvent ? (
        <DetailScreen
          event={selectedEvent}
          isSaved={savedIds.has(selectedEvent.id)}
          onBack={() => setScreen('home')}
          onToggleSaved={() => toggleSaved(selectedEvent.id)}
        />
      ) : (
        <HomeScreen
          activeTab={activeTab}
          savedEvents={savedEvents}
          onEventPress={openEvent}
          onTabChange={handleTabChange}
        />
      )}
    </SafeAreaProvider>
  );
}

function HomeScreen({ activeTab, savedEvents, onEventPress, onTabChange }) {
  const urgentEvents = events.filter((event) => event.isUrgent);
  const upcomingEvents = events.filter((event) => !event.isUrgent);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>덕력캘린더</Text>
        <View style={styles.headerActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="검색"
            style={styles.iconButton}
            onPress={() => Alert.alert('검색', '백엔드 검색 API 연결 후 활성화됩니다.')}
          >
            <Ionicons name="search" size={22} color="#3A3A3A" />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="알림"
            style={styles.iconButton}
            onPress={() => Alert.alert('알림', '관심 행사 알림 기능을 연결할 수 있어요.')}
          >
            <Ionicons name="notifications-outline" size={22} color="#3A3A3A" />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.homeContent}>
        {activeTab === 'home' && (
          <>
            <View style={styles.calendarCard}>
              <MiniCalendar dots={calendarDots} today={29} />
            </View>

            <BirthdayBanner />

            <SectionHeader title="오늘 마감 임박" count={urgentEvents.length} />
            <EventHeroCard event={urgentEvents[0]} onPress={onEventPress} />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalCards}
            >
              {urgentEvents.slice(1).map((event) => (
                <SmallEventCard key={event.id} event={event} onPress={onEventPress} />
              ))}
            </ScrollView>

            <SectionHeader title="다가오는 행사" showAll />
            <View style={styles.eventList}>
              {upcomingEvents.map((event) => (
                <ListEventCard key={event.id} event={event} onPress={onEventPress} />
              ))}
            </View>
          </>
        )}

        {activeTab === 'calendar' && (
          <>
            <View style={styles.calendarCard}>
              <MiniCalendar dots={calendarDots} today={29} large />
            </View>
            <SectionHeader title="4월 행사 모아보기" count={events.length} />
            <View style={styles.eventList}>
              {events.map((event) => (
                <ListEventCard key={event.id} event={event} onPress={onEventPress} />
              ))}
            </View>
          </>
        )}

        {activeTab === 'saved' && (
          <>
            <SectionHeader title="찜한 행사" count={savedEvents.length} />
            <View style={styles.eventList}>
              {savedEvents.length === 0 ? (
                <EmptyState title="아직 찜한 행사가 없어요" body="관심 있는 행사를 저장하면 여기서 다시 볼 수 있습니다." />
              ) : (
                savedEvents.map((event) => (
                  <ListEventCard key={event.id} event={event} onPress={onEventPress} />
                ))
              )}
            </View>
          </>
        )}

        {activeTab === 'my' && (
          <View style={styles.myPanel}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={28} color={pink} />
            </View>
            <Text style={styles.myTitle}>게스트 덕후</Text>
            <Text style={styles.myBody}>로그인, 선호 IP, 알림 설정은 백엔드 인증 API와 연결하면 바로 확장할 수 있습니다.</Text>
          </View>
        )}
      </ScrollView>

      <TabBar activeTab={activeTab} onTabChange={onTabChange} />
    </SafeAreaView>
  );
}

function DetailScreen({ event, isSaved, onBack, onToggleSaved }) {
  const urgentToday = event.urgencyLabel === '오늘 마감';

  const handleShare = async () => {
    await Share.share({
      message: `${event.shortTitle}\n${event.startDate} ~ ${event.endDate}\n${event.location}`
    });
  };

  return (
    <View style={styles.detailRoot}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <EventPoster event={event} height={320} showTitle={false} rounded={false}>
          <View style={styles.posterGradient} />
          <View style={styles.detailTopActions}>
            <Pressable accessibilityRole="button" accessibilityLabel="뒤로가기" style={styles.glassButton} onPress={onBack}>
              <Ionicons name="chevron-back" size={25} color="#FFFFFF" />
            </Pressable>
            <View style={styles.detailRightActions}>
              <Pressable accessibilityRole="button" accessibilityLabel="저장" style={styles.glassButton} onPress={onToggleSaved}>
                <Ionicons name={isSaved ? 'bookmark' : 'bookmark-outline'} size={22} color={isSaved ? pink : '#FFFFFF'} />
              </Pressable>
              <Pressable accessibilityRole="button" accessibilityLabel="공유" style={styles.glassButton} onPress={handleShare}>
                <Ionicons name="share-outline" size={22} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        </EventPoster>

        <View style={styles.detailSheet}>
          <View style={styles.badgeRow}>
            {event.urgencyLabel && (
              <Text style={[styles.urgencyBadge, urgentToday ? styles.todayBadge : styles.dDayBadge]}>
                {urgentToday ? 'D-0 · 오늘 마감' : `D-${event.daysLeft} · ${event.urgencyLabel}`}
              </Text>
            )}
            <Text style={[styles.typeBadge, { color: event.ipColor, backgroundColor: `${event.ipColor}1A` }]}>
              {event.type}
            </Text>
          </View>

          <Text style={[styles.ipLabel, { color: event.ipColor }]}>{event.ipKo}</Text>
          <Text style={styles.detailTitle}>{event.titleLines.join('\n')}</Text>

          <InfoRow icon="calendar-outline" text={`${event.startDate} ~ ${event.endDate}`} />
          <InfoRow icon="location-outline" text={event.location} />

          <View style={styles.divider} />

          <Text style={styles.blockTitle}>행사 소개</Text>
          <Text style={styles.description}>{event.description}</Text>

          <View style={styles.tags}>
            {event.tags.map((tag) => (
              <Text key={tag} style={styles.tag}>#{tag}</Text>
            ))}
          </View>

          <View style={styles.ctaRow}>
            <Pressable
              accessibilityRole="button"
              style={[styles.secondaryCta, isSaved && styles.secondaryCtaActive]}
              onPress={onToggleSaved}
            >
              <Ionicons name={isSaved ? 'bookmark' : 'bookmark-outline'} size={18} color={isSaved ? pink : '#3A3A3A'} />
              <Text style={[styles.secondaryCtaText, isSaved && styles.secondaryCtaTextActive]}>
                {isSaved ? '저장됨' : '저장하기'}
              </Text>
            </Pressable>
            <Pressable accessibilityRole="button" style={[styles.primaryCta, { backgroundColor: event.ipColor }]} onPress={handleShare}>
              <Ionicons name="share-outline" size={18} color="#FFFFFF" />
              <Text style={styles.primaryCtaText}>공유하기</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function EventPoster({ event, height = 200, showTitle = true, rounded = true, children }) {
  return (
    <View
      style={[
        styles.poster,
        {
          height,
          borderRadius: rounded ? 16 : 0,
          backgroundColor: event.ipColor
        }
      ]}
    >
      <View style={[styles.posterDarkLayer, { backgroundColor: event.ipColorDark }]} />
      <View style={[styles.posterCircleLarge, { width: height, height, borderRadius: height / 2 }]} />
      <View style={[styles.posterCircleSmall, { width: height * 0.55, height: height * 0.55, borderRadius: height * 0.275 }]} />
      <Text
        numberOfLines={1}
        style={[
          styles.posterTexture,
          {
            fontSize: Math.max(height * 0.19, 30),
            bottom: showTitle ? height * 0.27 : -5
          }
        ]}
      >
        {event.ip}
      </Text>
      {showTitle && (
        <View style={styles.posterTextOverlay}>
          <Text style={styles.posterTitle} numberOfLines={2}>{event.shortTitle}</Text>
          <View style={styles.posterMetaRow}>
            <Text style={styles.posterMeta}>{event.startDate} ~ {event.endDate}</Text>
            <Text style={styles.posterMeta} numberOfLines={1}>{event.location}</Text>
          </View>
        </View>
      )}
      {children}
    </View>
  );
}

function EventHeroCard({ event, onPress }) {
  return (
    <Pressable style={styles.heroCard} onPress={() => onPress(event)}>
      <EventPoster event={event} height={218} />
      {event.urgencyLabel && <Text style={styles.heroUrgency}>{event.urgencyLabel}</Text>}
    </Pressable>
  );
}

function SmallEventCard({ event, onPress }) {
  return (
    <Pressable style={styles.smallCard} onPress={() => onPress(event)}>
      <EventPoster event={event} height={118} />
      <View style={styles.smallCardBody}>
        <Text style={styles.smallCardTitle}>{event.ipKo}</Text>
        {event.urgencyLabel && (
          <Text style={[styles.smallUrgency, event.urgencyLabel === '오늘 마감' ? styles.smallToday : styles.smallDday]}>
            {event.urgencyLabel}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

function ListEventCard({ event, onPress }) {
  return (
    <Pressable style={styles.listCard} onPress={() => onPress(event)}>
      <View style={styles.listPoster}>
        <EventPoster event={event} height={88} rounded={false} showTitle={false} />
      </View>
      <View style={styles.listBody}>
        <Text style={[styles.listType, { color: event.ipColor, backgroundColor: `${event.ipColor}1A` }]}>
          {event.type}
        </Text>
        <Text style={styles.listTitle} numberOfLines={1}>{event.shortTitle}</Text>
        <View style={styles.listMeta}>
          <Ionicons name="calendar-outline" size={13} color="#9E9E9E" />
          <Text style={styles.listMetaText}>{event.startDate} ~ {event.endDate}</Text>
          <Ionicons name="location-outline" size={13} color="#9E9E9E" />
          <Text style={styles.listMetaText} numberOfLines={1}>{event.location}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function BirthdayBanner() {
  return (
    <View style={[styles.birthdayBanner, { backgroundColor: birthday.ipColor }]}>
      <View style={styles.birthdayCircleA} />
      <View style={styles.birthdayCircleB} />
      <Text style={styles.birthdayEyebrow}>오늘의 생일</Text>
      <Text style={styles.birthdayName}>{birthday.characterName}</Text>
      <Text style={styles.birthdayMeta}>{birthday.series}  ·  {birthday.date}</Text>
    </View>
  );
}

function MiniCalendar({ dots, today = 29, large = false }) {
  const labels = ['일', '월', '화', '수', '목', '금', '토'];
  const firstDayIndex = 3;
  const cells = [
    ...Array.from({ length: firstDayIndex }, () => null),
    ...Array.from({ length: 30 }, (_, index) => index + 1)
  ];

  return (
    <View style={styles.calendarInner}>
      <View style={styles.monthRow}>
        <Ionicons name="chevron-back" size={18} color="#C0C0C0" />
        <Text style={styles.monthTitle}>2026년 4월</Text>
        <Ionicons name="chevron-forward" size={18} color="#C0C0C0" />
      </View>

      <View style={styles.dayLabelGrid}>
        {labels.map((label, index) => (
          <Text
            key={label}
            style={[
              styles.dayLabel,
              index === 0 && styles.sunday,
              index === 6 && styles.saturday
            ]}
          >
            {label}
          </Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {cells.map((day, index) => {
          if (!day) {
            return <View key={`empty-${index}`} style={[styles.dayCell, large && styles.largeDayCell]} />;
          }

          const column = (firstDayIndex + day - 1) % 7;
          const dayDots = dots[day] || [];
          const isToday = day === today;

          return (
            <View key={day} style={[styles.dayCell, large && styles.largeDayCell]}>
              <View style={[styles.dayBubble, isToday && styles.todayBubble]}>
                <Text
                  style={[
                    styles.dayNumber,
                    column === 0 && styles.sunday,
                    column === 6 && styles.saturday,
                    isToday && styles.todayNumber
                  ]}
                >
                  {day}
                </Text>
              </View>
              <View style={styles.dotRow}>
                {dayDots.slice(0, 3).map((color, dotIndex) => (
                  <View key={`${day}-${dotIndex}`} style={[styles.calendarDot, { backgroundColor: color }]} />
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function SectionHeader({ title, count, showAll }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {count != null && <Text style={styles.sectionCount}>{count}</Text>}
      </View>
      {showAll && (
        <View style={styles.showAll}>
          <Text style={styles.showAllText}>전체보기</Text>
          <Ionicons name="chevron-forward" size={14} color="#B0B0B0" />
        </View>
      )}
    </View>
  );
}

function InfoRow({ icon, text }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={16} color="#B8B8B8" />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

function EmptyState({ title, body }) {
  return (
    <View style={styles.emptyState}>
      <Ionicons name="bookmark-outline" size={28} color="#BDBDBD" />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
    </View>
  );
}

function TabBar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', label: '홈', icon: 'home-outline', activeIcon: 'home' },
    { id: 'calendar', label: '캘린더', icon: 'calendar-outline', activeIcon: 'calendar' },
    { id: 'saved', label: '찜', icon: 'bookmark-outline', activeIcon: 'bookmark' },
    { id: 'my', label: 'MY', icon: 'person-outline', activeIcon: 'person' }
  ];

  return (
    <SafeAreaView edges={['bottom']} style={styles.tabSafeArea}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <Pressable key={tab.id} style={styles.tabItem} onPress={() => onTabChange(tab.id)}>
              <Ionicons name={active ? tab.activeIcon : tab.icon} size={22} color={active ? pink : '#C0C0C0'} />
              <Text style={[styles.tabLabel, active && styles.activeTabLabel]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: pageBg
  },
  header: {
    minHeight: 48,
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: pageBg
  },
  appTitle: {
    color: ink,
    fontSize: 22,
    fontWeight: '900'
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  iconButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notificationDot: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: pink,
    borderWidth: 1.5,
    borderColor: pageBg
  },
  homeContent: {
    paddingBottom: 22
  },
  calendarCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 2,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2
  },
  calendarInner: {
    paddingHorizontal: 14
  },
  monthRow: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  monthTitle: {
    color: ink,
    fontSize: 15,
    fontWeight: '700'
  },
  dayLabelGrid: {
    flexDirection: 'row',
    marginBottom: 2
  },
  dayLabel: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    color: '#C0C0C0',
    fontSize: 11,
    fontWeight: '600',
    paddingBottom: 5
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  dayCell: {
    width: `${100 / 7}%`,
    height: 40,
    alignItems: 'center'
  },
  largeDayCell: {
    height: 48
  },
  dayBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  todayBubble: {
    backgroundColor: pink
  },
  dayNumber: {
    color: '#2A2A2A',
    fontSize: 13
  },
  todayNumber: {
    color: '#FFFFFF',
    fontWeight: '700'
  },
  sunday: {
    color: pink
  },
  saturday: {
    color: '#A78BFA'
  },
  dotRow: {
    height: 6,
    marginTop: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2
  },
  calendarDot: {
    width: 4,
    height: 4,
    borderRadius: 2
  },
  birthdayBanner: {
    marginHorizontal: 16,
    marginBottom: 18,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#F57C00',
    shadowOpacity: 0.28,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4
  },
  birthdayCircleA: {
    position: 'absolute',
    top: -36,
    right: -18,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.09)'
  },
  birthdayCircleB: {
    position: 'absolute',
    right: 70,
    bottom: -22,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.06)'
  },
  birthdayEyebrow: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 3
  },
  birthdayName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 31,
    marginBottom: 6
  },
  birthdayMeta: {
    color: 'rgba(255,255,255,0.76)',
    fontSize: 12,
    fontWeight: '600'
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6
  },
  sectionTitle: {
    color: ink,
    fontSize: 15,
    fontWeight: '800'
  },
  sectionCount: {
    color: pink,
    fontSize: 13,
    fontWeight: '800'
  },
  showAll: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  showAllText: {
    color: '#B0B0B0',
    fontSize: 12
  },
  poster: {
    position: 'relative',
    overflow: 'hidden'
  },
  posterDarkLayer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.38
  },
  posterCircleLarge: {
    position: 'absolute',
    top: -72,
    right: -48,
    backgroundColor: 'rgba(255,255,255,0.07)'
  },
  posterCircleSmall: {
    position: 'absolute',
    bottom: -24,
    left: -28,
    backgroundColor: 'rgba(255,255,255,0.05)'
  },
  posterTexture: {
    position: 'absolute',
    right: 10,
    color: 'rgba(255,255,255,0.10)',
    fontWeight: '900'
  },
  posterTextOverlay: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 12
  },
  posterTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 19,
    marginBottom: 6
  },
  posterMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5
  },
  posterMeta: {
    maxWidth: '100%',
    overflow: 'hidden',
    color: 'rgba(255,255,255,0.92)',
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontSize: 10,
    fontWeight: '600'
  },
  heroCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.13,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5
  },
  heroUrgency: {
    position: 'absolute',
    top: 12,
    left: 12,
    color: '#FFFFFF',
    backgroundColor: '#FF3B30',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 11,
    fontWeight: '800'
  },
  horizontalCards: {
    paddingHorizontal: 16,
    paddingBottom: 18,
    gap: 10
  },
  smallCard: {
    width: 158,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  smallCardBody: {
    paddingHorizontal: 11,
    paddingTop: 9,
    paddingBottom: 10
  },
  smallCardTitle: {
    color: ink,
    fontSize: 11,
    fontWeight: '800'
  },
  smallUrgency: {
    alignSelf: 'flex-start',
    marginTop: 4,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 7,
    fontSize: 10,
    fontWeight: '800'
  },
  smallToday: {
    color: '#FF3B30',
    backgroundColor: '#FFF0EF'
  },
  smallDday: {
    color: '#FF9500',
    backgroundColor: '#FFF4E5'
  },
  eventList: {
    paddingHorizontal: 16,
    gap: 8
  },
  listCard: {
    minHeight: 88,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2
  },
  listPoster: {
    width: 88,
    overflow: 'hidden'
  },
  listBody: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  listType: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 7,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 5
  },
  listTitle: {
    color: ink,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 5
  },
  listMeta: {
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  listMetaText: {
    flexShrink: 1,
    color: '#9E9E9E',
    fontSize: 11
  },
  tabSafeArea: {
    backgroundColor: '#FFFFFF'
  },
  tabBar: {
    minHeight: 56,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3
  },
  tabLabel: {
    color: '#C0C0C0',
    fontSize: 10,
    fontWeight: '600'
  },
  activeTabLabel: {
    color: pink,
    fontWeight: '800'
  },
  emptyState: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 24
  },
  emptyTitle: {
    marginTop: 10,
    color: ink,
    fontSize: 15,
    fontWeight: '800'
  },
  emptyBody: {
    marginTop: 6,
    color: '#7A7A7A',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18
  },
  myPanel: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0F6',
    marginBottom: 12
  },
  myTitle: {
    color: ink,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8
  },
  myBody: {
    color: '#6A6A6A',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center'
  },
  detailRoot: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  posterGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.16)'
  },
  detailTopActions: {
    position: 'absolute',
    top: 58,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  detailRightActions: {
    flexDirection: 'row',
    gap: 8
  },
  glassButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.34)'
  },
  detailSheet: {
    marginTop: -22,
    minHeight: 420,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 34
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 7,
    marginBottom: 13
  },
  urgencyBadge: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: '800'
  },
  todayBadge: {
    color: '#FF3B30',
    backgroundColor: '#FFF0EF'
  },
  dDayBadge: {
    color: '#FF9500',
    backgroundColor: '#FFF4E5'
  },
  typeBadge: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: '700'
  },
  ipLabel: {
    marginBottom: 4,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  detailTitle: {
    color: ink,
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
    marginBottom: 18
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 9
  },
  infoText: {
    color: '#5A5A5A',
    fontSize: 13,
    fontWeight: '600'
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F3F3',
    marginTop: 11,
    marginBottom: 20
  },
  blockTitle: {
    color: ink,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 9
  },
  description: {
    color: '#5A5A5A',
    fontSize: 13,
    lineHeight: 23
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 20,
    marginBottom: 24
  },
  tag: {
    color: '#7A7A7A',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    fontSize: 12,
    fontWeight: '600'
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 10
  },
  secondaryCta: {
    flex: 1,
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    backgroundColor: '#FFFFFF'
  },
  secondaryCtaActive: {
    borderColor: pink,
    backgroundColor: '#FFF0F6'
  },
  secondaryCtaText: {
    color: '#3A3A3A',
    fontSize: 14,
    fontWeight: '800'
  },
  secondaryCtaTextActive: {
    color: pink
  },
  primaryCta: {
    flex: 1,
    minHeight: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6
  },
  primaryCtaText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800'
  }
});
