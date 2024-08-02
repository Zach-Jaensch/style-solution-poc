import type { Theme } from "../../theme";

export interface Localization {
  timeline: {
    loadMore: () => string;
    showLess: () => string;
    showMore: () => string;
  };
  carousel: {
    title: () => string;
    gallery: () => string;
    slide: () => string;
    showNext: () => string;
    showPrev: () => string;
  };
  pagination: {
    nextPage: () => string;
    previousPage: () => string;
    lastPage: () => string;
    inputLabel: (max: number) => string;
  };
  button: {
    remove: () => string;
    done: () => string;
    addFilter: () => string;
    viewMore: () => string;
  };
  uploader: {
    dragHere: () => string;
    tryAgain: () => string;
    browse: () => string;
    emptyFile: () => string;
    fileTooLarge: () => string;
    or: () => string;
    uploading: () => string;
    dropFileHere: () => string;
    invalidFileType: () => string;
    tooManyFiles: (maxCount: number) => string;
  };
  hierarchicalPicker: {
    loadMore: () => string;
  };
  formLabel: {
    optionalLabelDefault: () => string;
  };
  typeLabel: {
    inspection: () => string;
    action: () => string;
    issue: () => string;
    course: () => string;
    headsUp: () => string;
    rapidRefresh: () => string;
    playlist: () => string;
    brainBoost: () => string;
    courseCollection: () => string;
  };
  priorityLabel: {
    high: () => string;
    medium: () => string;
    low: () => string;
    none: () => string;
  };
  statusLabel: {
    "in-progress": () => string;
    completed: () => string;
    open: () => string;
    resolved: () => string;
    "to-view": () => string;
    acknowledged: () => string;
    unacknowledged: () => string;
  };
  searchInput: {
    search: () => string;
    clear: () => string;
  };
  layouts: {
    courseLayout: {
      lessons: (numberOfLessons: number) => string;
    };
    rapidRefreshLayout: {
      sessions: (currentSession: number, totalSession: number) => string;
      questions: (numberOfQuestions: number) => string;
    };
    brainBoostLayout: {
      questions: (numberOfQuestions: number) => string;
      duration: (duration: number) => string;
    };
    playlistLayout: {
      courses: (numberOfCourses: number) => string;
    };
  };
  passwordInput: {
    showPassword: () => string;
    hidePassword: () => string;
  };
  modal: {
    closeButton: () => string;
  };
  cancellableAlertDialog: {
    cancel: () => string;
    confirm: () => string;
  };
  inputTag: {
    defaultLabel: () => string;
  };
  catalogLayout: {
    titleImageAlt: (title: string) => string;
  };
}

export interface ConfigInContext {
  history?: History;
  localization: Localization;
}

export type Config = {
  theme?: Theme;
} & ConfigInContext;
