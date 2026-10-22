/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shift, 
  RoleMode, 
  WorkerTab, 
  BusinessTab, 
  FilterState, 
  PublishShiftForm 
} from './types.ts';
import { 
  INITIAL_AVAILABLE_SHIFTS, 
  INITIAL_HISTORY_SHIFTS, 
  INITIAL_BUSINESS_SHIFTS 
} from './data/mockData.ts';

// Common Components
import { StatusBar } from './components/common/StatusBar.tsx';
import { HomeIndicator } from './components/common/HomeIndicator.tsx';
import { Toast } from './components/common/Toast.tsx';
import { BottomNav } from './components/navigation/BottomNav.tsx';

// Screens
import { SearchScreen } from './components/screens/SearchScreen.tsx';
import { ShiftDetailsScreen } from './components/screens/ShiftDetailsScreen.tsx';
import { MyShiftsScreen } from './components/screens/MyShiftsScreen.tsx';
import { NewShiftScreen } from './components/screens/NewShiftScreen.tsx';
import { BusinessShiftsScreen } from './components/screens/BusinessShiftsScreen.tsx';
import { ProfileScreen } from './components/screens/ProfileScreen.tsx';
import { NotificationsModal } from './components/screens/NotificationsModal.tsx';

// Modals
import { RouteModal } from './components/modals/RouteModal.tsx';
import { ConfirmTakeShiftModal } from './components/modals/ConfirmTakeShiftModal.tsx';
import { CancelShiftModal } from './components/modals/CancelShiftModal.tsx';
import { CitySelectorModal } from './components/modals/CitySelectorModal.tsx';
import { FilterDrawer } from './components/modals/FilterDrawer.tsx';

// Icons for the desktop frame controller
import { Smartphone, Monitor, Navigation2, RefreshCw } from 'lucide-react';

export default function App() {
  // Application Data States
  const [availableShifts, setAvailableShifts] = useState<Shift[]>(INITIAL_AVAILABLE_SHIFTS);
  const [upcomingShifts, setUpcomingShifts] = useState<Shift[]>([]);
  const [historyShifts, setHistoryShifts] = useState<Shift[]>(INITIAL_HISTORY_SHIFTS);
  const [businessShifts, setBusinessShifts] = useState<Shift[]>(INITIAL_BUSINESS_SHIFTS);

  // App Navigation & Role Modes
  const [roleMode, setRoleMode] = useState<RoleMode>('worker');
  const [workerTab, setWorkerTab] = useState<WorkerTab>('search');
  const [businessTab, setBusinessTab] = useState<BusinessTab>('business-shifts');

  // Active Screen: 'main' or 'details'
  const [currentScreen, setCurrentScreen] = useState<'main' | 'details'>('main');
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    city: 'Сан-Франциско',
    dateFilter: 'all',
    role: 'all',
    minHourlyRate: 0,
    maxDistance: 10,
    duration: null,
  });

  // System & Environment Simulators
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [desktopFrameView, setDesktopFrameView] = useState(true);

  // Modals visibility
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Active shifts targets for modals
  const [routeShift, setRouteShift] = useState<Shift | null>(null);
  const [confirmTargetShift, setConfirmTargetShift] = useState<Shift | null>(null);
  const [cancelTargetShift, setCancelTargetShift] = useState<Shift | null>(null);

  // Editing shift for business
  const [editingShiftValues, setEditingShiftValues] = useState<Partial<PublishShiftForm> | undefined>(undefined);

  // Interactive feedback states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [justConfirmedShiftId, setJustConfirmedShiftId] = useState<string | null>(null);
  const [justCancelledShiftId, setJustCancelledShiftId] = useState<string | null>(null);
  const [isTakingShiftId, setIsTakingShiftId] = useState<string | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Open shift details screen
  const handleOpenDetails = (shift: Shift) => {
    setSelectedShift(shift);
    setCurrentScreen('details');
  };

  // Open route modal
  const handleOpenRoute = (shift: Shift) => {
    setRouteShift(shift);
    setIsRouteModalOpen(true);
  };

  // Request taking a shift (opens confirmation modal)
  const handleRequestTakeShift = (shift: Shift) => {
    setConfirmTargetShift(shift);
    setIsConfirmModalOpen(true);
  };

  // Execution of shift confirmation
  // SPEC REQUIREMENT: "Анимация кнопки: текст меняется на спиннер (2 сек) -> Toast-уведомление -> При успехе откройте «Мои смены»."
  const handleConfirmTakeShift = async () => {
    if (!confirmTargetShift) return;

    const shiftToBook = confirmTargetShift;
    setIsTakingShiftId(shiftToBook.id);

    // 2-second animation as explicitly demanded by the tech specs
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Update state: mark shift as booked
    const bookedShift: Shift = {
      ...shiftToBook,
      status: 'booked',
      spotsAvailable: 0,
      bookedAt: new Date().toISOString(),
    };

    // Remove from available and add to upcoming
    setAvailableShifts((prev) => prev.map((s) => (s.id === shiftToBook.id ? bookedShift : s)));
    setUpcomingShifts((prev) => [bookedShift, ...prev]);

    // Update selected shift if open
    if (selectedShift?.id === shiftToBook.id) {
      setSelectedShift(bookedShift);
    }

    // Close modals
    setIsConfirmModalOpen(false);
    setIsTakingShiftId(null);
    setJustConfirmedShiftId(bookedShift.id);

    // Show Toast
    setToastType('success');
    setToastMessage(`Смена в «${bookedShift.restaurant}» успешно подтверждена!`);

    // Switch to "Мои смены" screen
    setCurrentScreen('main');
    setWorkerTab('my-shifts');
  };

  // Request cancelling a shift
  const handleRequestCancel = (shift: Shift) => {
    setCancelTargetShift(shift);
    setIsCancelModalOpen(true);
  };

  // Execute cancellation
  const handleConfirmCancel = () => {
    if (!cancelTargetShift) return;

    const targetId = cancelTargetShift.id;
    const cancelledShift: Shift = {
      ...cancelTargetShift,
      status: 'cancelled',
      spotsAvailable: 1,
      cancelledAt: new Date().toISOString(),
      historyNote: 'Вы отменили смену. Она больше не отображается в предстоящих.',
    };

    // Remove from upcoming
    setUpcomingShifts((prev) => prev.filter((s) => s.id !== targetId));

    // Add to history
    setHistoryShifts((prev) => [cancelledShift, ...prev]);

    // Restore availability in available shifts
    setAvailableShifts((prev) =>
      prev.map((s) =>
        s.id === targetId
          ? { ...s, status: 'available', spotsAvailable: 1 }
          : s
      )
    );

    setIsCancelModalOpen(false);
    setJustCancelledShiftId(targetId);
    setToastType('success');
    setToastMessage('Смена отменена и перемещена в историю');
  };

  // Business: Publish new shift
  const handlePublishNewShift = (newShift: Shift) => {
    setBusinessShifts((prev) => [newShift, ...prev]);
    // Also make it available in the worker search feed!
    setAvailableShifts((prev) => [newShift, ...prev]);
    setToastType('success');
    setToastMessage(`Смена «${newShift.restaurant}» опубликована!`);
  };

  // Business: Edit existing shift
  const handleEditBusinessShift = (shift: Shift) => {
    setEditingShiftValues({
      restaurant: shift.restaurant,
      role: shift.role,
      date: shift.date,
      timeRange: `${shift.startTime}–${shift.endTime}`,
      startTime: shift.startTime,
      endTime: shift.endTime,
      duration: shift.duration,
      hourlyRate: shift.hourlyRate,
      city: shift.city,
      address: shift.address.split(',')[0],
      requirements: shift.requirements.join('; '),
      instructions: shift.instructions,
    });
    setBusinessTab('new-shift');
  };

  // Reset entire demo to initial state
  const handleResetDemo = () => {
    setAvailableShifts(INITIAL_AVAILABLE_SHIFTS);
    setUpcomingShifts([]);
    setHistoryShifts(INITIAL_HISTORY_SHIFTS);
    setBusinessShifts(INITIAL_BUSINESS_SHIFTS);
    setFilters({
      city: 'Сан-Франциско',
      dateFilter: 'all',
      role: 'all',
      minHourlyRate: 0,
      maxDistance: 10,
      duration: null,
    });
    setGpsEnabled(true);
    setCurrentScreen('main');
    setWorkerTab('search');
    setJustConfirmedShiftId(null);
    setJustCancelledShiftId(null);
    setToastType('success');
    setToastMessage('Демо-данные сброшены к начальным');
  };

  const isCurrentShiftBooked = selectedShift ? upcomingShifts.some((s) => s.id === selectedShift.id) : false;

  return (
    <div className="min-h-screen w-full bg-[#E5E7EB] flex flex-col items-center justify-start text-[#202326] antialiased">
      {/* Toast Notification Container */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Top Testing Bar for Reviewers & Developers */}
      <header className="w-full bg-[#202326] text-white py-2 px-4 shadow-sm z-50 shrink-0">
        <div className="max-w-[800px] mx-auto flex items-center justify-between gap-3 text-xs flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-[#FFBE24] text-[#202326] font-bold flex items-center justify-center text-[10px]">
              ↗
            </span>
            <span className="font-bold tracking-tight">SmenaGo</span>
            <span className="text-[#9CA3AF] hidden sm:inline">| UI-КИТ v1.0 / Окт 2026</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Quick Role Mode Switch */}
            <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setRoleMode('worker');
                  setCurrentScreen('main');
                }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  roleMode === 'worker' ? 'bg-[#FFBE24] text-[#202326]' : 'text-white/80 hover:text-white'
                }`}
              >
                Исполнитель
              </button>
              <button
                type="button"
                onClick={() => {
                  setRoleMode('business');
                  setCurrentScreen('main');
                }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  roleMode === 'business' ? 'bg-[#FFBE24] text-[#202326]' : 'text-white/80 hover:text-white'
                }`}
              >
                Бизнес
              </button>
            </div>

            {/* GPS Toggle simulator */}
            <button
              type="button"
              onClick={() => setGpsEnabled(!gpsEnabled)}
              className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 transition-colors ${
                gpsEnabled 
                  ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300' 
                  : 'border-amber-500/50 bg-amber-500/20 text-amber-300'
              }`}
              title="Переключить эмуляцию GPS для проверки Empty State"
            >
              <Navigation2 className="w-3.5 h-3.5" />
              <span>GPS: {gpsEnabled ? 'Вкл' : 'Выкл'}</span>
            </button>

            {/* Desktop frame vs Full width toggle */}
            <button
              type="button"
              onClick={() => setDesktopFrameView(!desktopFrameView)}
              className="p-1.5 rounded-lg bg-white/10 text-white/80 hover:text-white border border-white/10 hidden md:flex items-center"
              title={desktopFrameView ? 'Полноэкранный вид' : 'Мобильный фрейм 390px'}
            >
              {desktopFrameView ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            </button>

            {/* Reset Data */}
            <button
              type="button"
              onClick={handleResetDemo}
              className="p-1.5 rounded-lg bg-white/10 text-white/80 hover:text-white border border-white/10 flex items-center"
              title="Сбросить демо-данные"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main App Container */}
      <main className="w-full flex-1 flex justify-center py-0 md:py-6 px-0 md:px-4">
        {/* Mobile Device Frame */}
        <div 
          className={`w-full bg-[#F3F4F6] flex flex-col relative transition-all duration-200 ${
            desktopFrameView 
              ? 'max-w-[420px] md:h-[880px] md:rounded-[44px] md:border-[10px] md:border-[#1E2022] md:shadow-2xl md:ring-1 md:ring-black/10 overflow-hidden' 
              : 'max-w-2xl min-h-screen shadow-lg'
          }`}
        >
          {/* System Status Bar (9:41) */}
          <StatusBar time="9:41" dark={true} />

          {/* Active Screen View */}
          <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col relative">
            {currentScreen === 'details' && selectedShift ? (
              <ShiftDetailsScreen
                shift={selectedShift}
                onBack={() => setCurrentScreen('main')}
                onTakeShift={handleConfirmTakeShift}
                onOpenRoute={handleOpenRoute}
                isBooked={isCurrentShiftBooked}
              />
            ) : roleMode === 'worker' ? (
              /* WORKER PERSONA */
              <>
                {workerTab === 'search' && (
                  <SearchScreen
                    shifts={availableShifts}
                    filters={filters}
                    onUpdateFilters={setFilters}
                    onOpenFilterDrawer={() => setIsFilterDrawerOpen(true)}
                    onOpenCityModal={() => setIsCityModalOpen(true)}
                    onOpenNotifications={() => setIsNotificationsOpen(true)}
                    onOpenDetails={handleOpenDetails}
                    onTakeShift={handleRequestTakeShift}
                    gpsEnabled={gpsEnabled}
                    onToggleGps={() => setGpsEnabled(!gpsEnabled)}
                    isTakingShiftId={isTakingShiftId}
                  />
                )}

                {workerTab === 'my-shifts' && (
                  <MyShiftsScreen
                    upcomingShifts={upcomingShifts}
                    historyShifts={historyShifts}
                    onOpenDetails={handleOpenDetails}
                    onOpenRoute={handleOpenRoute}
                    onRequestCancel={handleRequestCancel}
                    onNavigateToSearch={() => setWorkerTab('search')}
                    justConfirmedShiftId={justConfirmedShiftId}
                    justCancelledShiftId={justCancelledShiftId}
                  />
                )}

                {workerTab === 'profile' && (
                  <ProfileScreen
                    roleMode={roleMode}
                    onChangeRoleMode={(mode) => {
                      setRoleMode(mode);
                      setCurrentScreen('main');
                    }}
                    gpsEnabled={gpsEnabled}
                    onToggleGps={() => setGpsEnabled(!gpsEnabled)}
                    onOpenNotifications={() => setIsNotificationsOpen(true)}
                  />
                )}
              </>
            ) : (
              /* BUSINESS PERSONA (Sprint 3) */
              <>
                {businessTab === 'business-shifts' && (
                  <BusinessShiftsScreen
                    businessShifts={businessShifts}
                    onOpenDetails={handleOpenDetails}
                    onEditShift={handleEditBusinessShift}
                    onNavigateToNewShift={() => {
                      setEditingShiftValues(undefined);
                      setBusinessTab('new-shift');
                    }}
                  />
                )}

                {businessTab === 'new-shift' && (
                  <NewShiftScreen
                    onPublishSuccess={handlePublishNewShift}
                    onNavigateToBusinessShifts={() => setBusinessTab('business-shifts')}
                    initialValues={editingShiftValues}
                    isEditing={!!editingShiftValues}
                  />
                )}

                {businessTab === 'profile' && (
                  <ProfileScreen
                    roleMode={roleMode}
                    onChangeRoleMode={(mode) => {
                      setRoleMode(mode);
                      setCurrentScreen('main');
                    }}
                    gpsEnabled={gpsEnabled}
                    onToggleGps={() => setGpsEnabled(!gpsEnabled)}
                    onOpenNotifications={() => setIsNotificationsOpen(true)}
                  />
                )}
              </>
            )}
          </div>

          {/* Bottom Navigation (Fixed on main screens) */}
          {currentScreen === 'main' && (
            <BottomNav
              roleMode={roleMode}
              workerTab={workerTab}
              businessTab={businessTab}
              onSelectWorkerTab={setWorkerTab}
              onSelectBusinessTab={setBusinessTab}
              upcomingCount={upcomingShifts.length}
            />
          )}

          {/* System Home Indicator bar at the bottom */}
          <HomeIndicator dark={true} />
        </div>
      </main>

      {/* Global Modals & Drawers */}
      {routeShift && (
        <RouteModal
          shift={routeShift}
          isOpen={isRouteModalOpen}
          onClose={() => {
            setIsRouteModalOpen(false);
            setRouteShift(null);
          }}
        />
      )}

      {confirmTargetShift && (
        <ConfirmTakeShiftModal
          shift={confirmTargetShift}
          isOpen={isConfirmModalOpen}
          onClose={() => {
            setIsConfirmModalOpen(false);
            setConfirmTargetShift(null);
          }}
          onConfirm={handleConfirmTakeShift}
        />
      )}

      {cancelTargetShift && (
        <CancelShiftModal
          shift={cancelTargetShift}
          isOpen={isCancelModalOpen}
          onClose={() => {
            setIsCancelModalOpen(false);
            setCancelTargetShift(null);
          }}
          onConfirmCancel={handleConfirmCancel}
        />
      )}

      <CitySelectorModal
        currentCity={filters.city}
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        onSelectCity={(city) => setFilters({ ...filters, city })}
      />

      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onApply={setFilters}
        onReset={() =>
          setFilters({
            city: 'Сан-Франциско',
            dateFilter: 'all',
            role: 'all',
            minHourlyRate: 0,
            maxDistance: 10,
            duration: null,
          })
        }
        allShifts={availableShifts}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}
