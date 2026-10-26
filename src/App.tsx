import React, { useEffect } from 'react';
import { useListStore } from './store/useListStore';
import { DeviceFrame } from './components/common/DeviceFrame';
import { BottomNavigation } from './components/common/BottomNavigation';
import { UndoSnackbar } from './components/common/UndoSnackbar';
import { MultiSelectBar } from './components/modals/MultiSelectBar';
import { CreateListModal } from './components/modals/CreateListModal';
import { QuickAddModal } from './components/modals/QuickAddModal';
import { ItemDetailModal } from './components/modals/ItemDetailModal';
import { MoveItemModal } from './components/modals/MoveItemModal';
import { ActionSheetPlus } from './components/modals/ActionSheetPlus';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ListsScreen } from './screens/ListsScreen';
import { ListDetailScreen } from './screens/ListDetailScreen';
import { InboxScreen } from './screens/InboxScreen';
import { TodayScreen } from './screens/TodayScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { ArchiveScreen } from './screens/ArchiveScreen';
import { TrashScreen } from './screens/TrashScreen';
import { TagsScreen } from './screens/TagsScreen';
import { TemplatesScreen } from './screens/TemplatesScreen';
import { InsightsScreen } from './screens/InsightsScreen';
import { SearchScreen } from './screens/SearchScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ExportImportScreen } from './screens/ExportImportScreen';
import { MoreMenuScreen } from './screens/MoreMenuScreen';

export const App: React.FC = () => {
  const { currentScreen, settings } = useListStore();

  useEffect(() => {
    // Only one theme: Lavender Purple
    document.documentElement.classList.remove('theme-dark');
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'home':
        return <HomeScreen />;
      case 'lists':
        return <ListsScreen />;
      case 'list-detail':
        return <ListDetailScreen />;
      case 'inbox':
        return <InboxScreen />;
      case 'today':
        return <TodayScreen />;
      case 'calendar':
        return <CalendarScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'archive':
        return <ArchiveScreen />;
      case 'trash':
        return <TrashScreen />;
      case 'tags':
        return <TagsScreen />;
      case 'templates':
        return <TemplatesScreen />;
      case 'insights':
        return <InsightsScreen />;
      case 'search':
        return <SearchScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'export-import':
        return <ExportImportScreen />;
      case 'more':
        return <MoreMenuScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const showBottomNav = currentScreen !== 'splash' && currentScreen !== 'onboarding';

  return (
    <DeviceFrame>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          minHeight: 0,
          position: 'relative',
        }}
      >
        <main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {renderScreen()}
        </main>

        {/* Persistent Bottom Bar */}
        {showBottomNav && <BottomNavigation />}
      </div>

      {/* Floating Modals, Sheets & Snackbars */}
      <ActionSheetPlus />
      <CreateListModal />
      <QuickAddModal />
      <ItemDetailModal />
      <MoveItemModal />
      <MultiSelectBar />
      <UndoSnackbar />
    </DeviceFrame>
  );
};

export default App;
