import type { Localization } from "./types";

const localization: Localization = {
  timeline: {
    showMore: () => "Show more",
    showLess: () => "Show less",
    loadMore: () => "View more",
  },
  button: {
    remove: () => "Remove",
    done: () => "Done",
    addFilter: () => "Add filter",
    viewMore: () => "View more",
  },
  carousel: {
    title: () => "carousel",
    gallery: () => "gallery",
    slide: () => "slide",
    showNext: () => "show next",
    showPrev: () => "show previous",
  },
  pagination: {
    nextPage: () => "Go to next page",
    previousPage: () => "Go to previous page",
    lastPage: () => "Go to last page",
    inputLabel: (max: number) => `Page number, of ${max} pages; Required`,
  },
  uploader: {
    dragHere: () => "Drag your file here",
    tryAgain: () => "Try again or",
    browse: () => "Browse",
    emptyFile: () => "File is empty.",
    fileTooLarge: () => "File is too large.",
    or: () => "or",
    uploading: () => "Uploading...",
    dropFileHere: () => "Drop your file here",
    invalidFileType: () => "Invalid file type. The supported file types are:",
    tooManyFiles: (maxCount: number) =>
      `Too many files, only ${maxCount === 1 ? "one file is" : maxCount + " files are"} allowed.`,
  },
  hierarchicalPicker: {
    loadMore: () => "Load more",
  },
  formLabel: {
    optionalLabelDefault: () => "(optional)",
  },
  typeLabel: {
    inspection: () => "Inspection",
    action: () => "Action",
    issue: () => "Issue",
    course: () => "Course",
    headsUp: () => "Heads Up",
    rapidRefresh: () => "Rapid Refresh",
    playlist: () => "Playlist",
    brainBoost: () => "Brain Boost",
    courseCollection: () => "Course Collection",
  },
  priorityLabel: {
    high: () => "High",
    medium: () => "Medium",
    low: () => "Low",
    none: () => "None",
  },
  searchInput: {
    search: () => "Search",
    clear: () => "Clear Search",
  },
  statusLabel: {
    "in-progress": () => "In Progress",
    completed: () => "Completed",
    open: () => "Open",
    resolved: () => "Resolved",
    "to-view": () => "To View",
    acknowledged: () => "Acknowledged",
    unacknowledged: () => "Unacknowledged",
  },
  layouts: {
    courseLayout: {
      lessons: (numberOfLessons: number) =>
        numberOfLessons === 1 ? "1 Lesson" : `${numberOfLessons} Lessons`,
    },
    rapidRefreshLayout: {
      sessions: (currentSession: number, totalSession: number) =>
        `${currentSession} of ${totalSession}`,
      questions: (numberOfQuestions: number) =>
        numberOfQuestions === 1
          ? "1 Question"
          : `${numberOfQuestions} Questions`,
    },
    brainBoostLayout: {
      questions: (numberOfQuestions: number) =>
        numberOfQuestions === 1
          ? "1 Question"
          : `${numberOfQuestions} Questions`,
      duration: (duration: number) =>
        duration === 1 ? "1 Minute" : `${duration} Minutes`,
    },
    playlistLayout: {
      courses: (numberOfCourses: number) =>
        numberOfCourses === 1 ? "1 Course" : `${numberOfCourses} Courses`,
    },
  },
  passwordInput: {
    showPassword: () => "Show password as plain text.",
    hidePassword: () => "Hide password",
  },
  modal: {
    closeButton: () => "Close button",
  },
  cancellableAlertDialog: {
    cancel: () => "Cancel",
    confirm: () => "Confirm",
  },
  inputTag: {
    defaultLabel: () => "Tag",
  },
  catalogLayout: {
    titleImageAlt: (title: string) => `Image for ${title}`,
  },
};

export default localization;
