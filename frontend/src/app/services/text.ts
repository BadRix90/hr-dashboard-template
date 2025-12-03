import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  // Navigation
  nav = {
    dashboard: 'Dashboard',
    vacation: 'Urlaub',
    timeTracking: 'Zeiterfassung',
    team: 'Team',
    settings: 'Einstellungen'
  };

  // Common
  common = {
    save: 'Speichern',
    cancel: 'Abbrechen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    view: 'Ansehen',
    add: 'Hinzufügen',
    search: 'Suchen...',
    markAllAsRead: 'Alle als gelesen markieren',
    viewAll: 'Alle anzeigen',
    logout: 'Abmelden'
  };

  // Dashboard
  dashboard = {
    title: 'HR Dashboard',
    subtitle: 'Willkommen zurück! Hier ist deine Übersicht.',
    vacationDays: 'Urlaubstage',
    hoursThisWeek: 'Stunden diese Woche',
    activeMembers: 'Aktive Mitglieder',
    pendingRequests: 'Offene Anfragen'
  };

  // Vacation
  vacation = {
    title: 'Urlaubsverwaltung',
    subtitle: 'Verwalte deine Urlaubstage und Anträge',
    availableDays: 'Verfügbare Tage',
    usedDays: 'Genutzte Tage',
    pendingRequests: 'Offene Anträge',
    requestVacation: 'Urlaub beantragen',
    startDate: 'Startdatum',
    endDate: 'Enddatum',
    reason: 'Grund (optional)',
    submitRequest: 'Antrag stellen',
    vacationHistory: 'Urlaubshistorie',
    days: 'Tage',
    status: {
      pending: 'Ausstehend',
      approved: 'Genehmigt',
      rejected: 'Abgelehnt'
    }
  };

  // Time Tracking
  timeTracking = {
    title: 'Zeiterfassung',
    subtitle: 'Erfasse deine Arbeitszeiten',
    start: 'Starten',
    stop: 'Stoppen',
    today: 'Heute',
    thisWeek: 'Diese Woche',
    timeEntries: 'Zeiteinträge',
    addManualEntry: 'Manuellen Eintrag hinzufügen',
    weeklyOverview: 'Wochenübersicht',
    hours: 'Stunden',
    project: 'Projekt',
    description: 'Beschreibung',
    duration: 'Dauer'
  };

  // Team
  team = {
    title: 'Team Übersicht',
    subtitle: 'Verwalte deine Teammitglieder',
    totalMembers: 'Gesamtmitglieder',
    activeToday: 'Heute aktiv',
    onVacation: 'Im Urlaub',
    teamMembers: 'Teammitglieder',
    searchMembers: 'Mitglieder suchen...',
    addMember: 'Mitglied hinzufügen',
    departmentDistribution: 'Abteilungsverteilung',
    members: 'Mitglieder',
    hoursThisWeek: 'Stunden diese Woche',
    vacationDays: 'Urlaubstage'
  };

  // Settings
  settings = {
    title: 'Einstellungen',
    subtitle: 'Konfiguriere deine Einstellungen',
    tabs: {
      profile: 'Profil',
      account: 'Account',
      notifications: 'Benachrichtigungen',
      appearance: 'Darstellung'
    },
    profile: {
      title: 'Profil Einstellungen',
      changeAvatar: 'Avatar ändern',
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail',
      phone: 'Telefon',
      department: 'Abteilung',
      role: 'Rolle',
      saveChanges: 'Änderungen speichern'
    },
    account: {
      title: 'Account Einstellungen',
      changePassword: 'Passwort ändern',
      currentPassword: 'Aktuelles Passwort',
      newPassword: 'Neues Passwort',
      confirmPassword: 'Passwort bestätigen',
      updatePassword: 'Passwort aktualisieren',
      dangerZone: 'Gefahrenzone',
      dangerText: 'Sobald du dein Konto löschst, gibt es kein Zurück mehr.',
      deleteAccount: 'Konto löschen'
    },
    notifications: {
      title: 'Benachrichtigungs-Einstellungen',
      email: 'E-Mail Benachrichtigungen',
      emailDesc: 'Erhalte E-Mail-Benachrichtigungen für wichtige Updates',
      vacation: 'Urlaubsanträge',
      vacationDesc: 'Werde benachrichtigt wenn Urlaubsanträge genehmigt oder abgelehnt werden',
      timeTracking: 'Zeiterfassungs-Erinnerungen',
      timeTrackingDesc: 'Erhalte Erinnerungen zum Erfassen deiner Arbeitszeiten',
      team: 'Team Updates',
      teamDesc: 'Werde über Teammitglieder-Änderungen und Updates benachrichtigt',
      savePreferences: 'Einstellungen speichern'
    },
    appearance: {
      title: 'Darstellung',
      theme: 'Theme',
      light: 'Hell',
      dark: 'Dunkel',
      auto: 'Automatisch',
      fontFamily: 'Schriftart',
      fontSample: 'Franz jagt im komplett verwahrlosten Taxi quer durch Bayern'
    }
  };

  // Profile Card
  profile = {
    profileSettings: 'Profil Einstellungen',
    myVacation: 'Mein Urlaub',
    timeTracking: 'Zeiterfassung',
    logout: 'Abmelden'
  };

  // Notifications
  notifications = {
    title: 'Benachrichtigungen',
    noNotifications: 'Keine Benachrichtigungen',
    markAllRead: 'Alle als gelesen markieren',
    viewAll: 'Alle Benachrichtigungen anzeigen',
    types: {
      vacation: 'Urlaub',
      time: 'Zeiterfassung',
      team: 'Team',
      system: 'System'
    }
  };

  // Week days
  weekDays = {
    short: {
      mon: 'Mo',
      tue: 'Di',
      wed: 'Mi',
      thu: 'Do',
      fri: 'Fr',
      sat: 'Sa',
      sun: 'So'
    },
    long: {
      monday: 'Montag',
      tuesday: 'Dienstag',
      wednesday: 'Mittwoch',
      thursday: 'Donnerstag',
      friday: 'Freitag',
      saturday: 'Samstag',
      sunday: 'Sonntag'
    }
  };
}
