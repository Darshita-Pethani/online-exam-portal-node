//GLOBAL STATUS
exports.STATUS_CODES = {
    // 1XX INFORMATIONAL
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    EARLY_HINTS: 103,

    // 2XX SUCCESS
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
    ALREADY_REPORTED: 208,
    ALREADY_REPORTED_User: 209,
    IM_USED: 226,

    // 4XX CLIENT ERROR
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    CONFLICT: 409,
    PRECONDITION_FAILED: 412,
    VALIDATION_ERROR: 422,
    NOT_VALID_DATA: 422,

    // 5XX SERVER ERROR
    SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
};

//GLOBAL MESSAGES
exports.STATUS_MESSAGES = {
    SERVER_ERROR: "Internal server error! Please try again.",
    VERIFICATION_EMAIL_SENT: "We have sent you an verification email to your account",
    EMAIL_VERIFIED: "Your account has been verified successfully.",
    EMAIL_VERIFIED_ALREADY: "Your account is already verified.",
    REGISTER_SUCCESS: "You have successfully signed up.",
    LOGIN_SUCCESS: "You have successfully logged in.",
    IMAGE_SUCCESS: "Your image has been successfully saved.",
    IMAGE_REMOVED: 'Your image has been successfully removed.',
    RESET_PASSWORD_ALREADY: "You already have reset the password with this token.",

    IDENTITY_TYPE: {
        ADDED: 'Identity type has been added successfully.',
        UPDATED: 'Identity type has been updated successfully.',
        DELETED: 'Identity type has been deleted successfully.',
        NOT_FOUND: 'Identity type is not available in our system.',
        EXIST: 'Identity type already exist in our system.',
    },
    IDENTITY: {
        ADDED: 'Identity has been added successfully.',
        UPDATED: 'Identity has been updated successfully.',
        DELETED: 'Identity has been deleted successfully.',
        NOT_FOUND: 'Identity is not available in our system.',
    },
    JOB_TYPE: {
        ADDED: 'Job type has been added successfully.',
        UPDATED: 'Job type has been updated successfully.',
        DELETED: 'Job type has been deleted successfully.',
        EXIST: 'Job type already exist in our system.',
        NOT_FOUND: 'Job type is not available in our system.',
    },
    SKILL: {
        ADDED: 'Skill has been added successfully.',
        UPDATED: 'Skill has been updated successfully.',
        DELETED: 'Skill has been deleted successfully.',
        EXIST: 'Skill already exist in our system.',
        NOT_FOUND: 'Skill is not available in our system.'
    },
    JOB: {
        ADDED: 'Job has been added Successfully.',
        UPDATED: 'Job has been updated Successfully.',
        DELETED: 'Job has been deleted Successfully.',
        EXIST: 'Job already exist in our system.',
        NOT_FOUND: 'Job is not available in our system.'
    },
    BANK_DETAILS: {
        ADDED: 'Bank details has been added successfully.',
        UPDATED: 'Bank details has been updated successfully.',
        DELETED: 'Bank details has been deleted successfully.',
        NOT_FOUND: 'Bank details is not available in our system.',
    },
    SKILL_RELATION: {
        ADDED: 'Skill relation has been added successfully.',
        UPDATED: 'Skill relation has been updated successfully.',
        DELETED: 'Skill relation has been deleted successfully.',
        NOT_FOUND: 'Skill relation is not available in our system.'
    },
    EVENTS: {
        ADDED: 'Event has been added successfully.',
        UPDATED: 'Event has been updated successfully.',
        DELETED: 'Event has been deleted successfully.',
        NOT_FOUND: 'Event is not available in our system.',
    },

    EXISTS: {
        USER: "User already exist!",
        EMAIL: "Email is already registered!",
        EMAIL_GUEST: "It looks like you've ordered with us before! Click 'Forgot Password' to reset your password.",
        COUPON: "This coupon code already exist!",
        SLUG: "This slug already exist!",
        CONTACT: "Mobile number is already exist!",
        USERNAME: "Username is already exist!",
        TITLE: "This title already exist",
        EMAIL_ALREADY_EXISTS: "This email is already registered withe another customer!",
        DESIGNATION: 'Designation is already exist!',
        LEAVE_SUB_TYPES: 'This leave sub type is already exist!',
        ROLE: 'Role is already exist!',
        EXAM_TYPE: 'Exam type is already exist!',
        QUESTION_TYPE: 'Question type is already exist!',
        STANDARD: 'Standard is already exist!',
        USER_ENROLL: 'Alredy exam enrolled',
        USER_NOT_ALLOWED: 'You are not allowed to give this exam',
    },
    NOT_FOUND: {
        SKILL: "Skill is not available in our system!",
        USER: "User is not available in our system!",
        // USER: "Your email address is not available in our system!",
        ROLE: "Role is not available in our system!",
        EXAM_TYPE: "Exam type is not available in our system!",
        QUESTION_TYPE: "Question type is not available in our system!",
        STANDARD: "Standard is not available in our system!",
        EMAIL: "Your email address is not available in our system!",
        IMAGE: "Image not available.",
        ACCOUNT: "We can't find this account",
        USER_LOOKUP: "User is not available in our system!",
        PAGE: "Page is not available in our system!",
        FAQ: "Faq is not available in our system!",
        DESIGNATION: "Designation is not available in our system!",
        LEAVE_CONFIGURATION: "Leave Configuration is not available in our system!",
        SUBJECT: "Subject is not available in our system!",
        EXAM: "Exam is not available in our system!",
        QUESTION: "Question is not available in our system!",
        RESULT: "Sorry pls complete exam first!!!",
        PRODUCT: {
            PRODUCT: "Product is not available in our system!",
        },
    },
    PASSWORD: {
        MISMATCH: "Provided password do not match",
        TOO_SIMPLE: "Please create more complicated password",
        INCORRECT: "Password incorrect",
        NOT_SAME: "New Password and confirm password are not same",
        CHANGED: "Password has been changed successfully",
        CURRENT_PASSWORD_MISMATCH: "Current password does not match."
    },
    PROCESS: {
        EMAIL_SENT: "We have sent email to your account",
        EMAIL_SENT_ACCOUNT: "We have sent email to %s"
    },
    CONTACT_US_PROCESS: {
        EMAIL_SENT: "Your email has been sent successfully"
    },
    TOKEN: {
        INVALID: "Your token is not valid.",
        EXPIRED: "Your token has been expired.",
        LOGOUT: "You have been successfully logged out."
    },
    IN_USE: {
        CATEGORY: "This category is being used by other modules !",
        PRODUCT: "This product is being used by other modules !",
    },
    ADMIN: {
        DELETED: 'Admin has been deleted successfully.',
        NOT_AVAILABLE: 'User is not available in our system.',
        UPDATED: 'Admin has been updated successfully.',
        ADDED: 'Admin has been added successfully.',
        PROFILE_UPDATED: "Your profile has been updated successfully.",
        PROFILE_IMAGE_UPDATED: "Your profile image has been updated successfully.",
        PROFILE_DELETED: "Your profile has been deleted successfully.",
        NOT_VERIFIED: "Your email address is not verified.",
        INACTIVE: "Your email address is not active.",
        INVALID: "Please enter valid email & password."
    },
    EMPLOYEE: {
        DELETED: 'Employee has been deleted successfully.',
        UPDATED: 'Employee has been updated successfully.',
        ADDED: 'Employee has been added successfully.',
        PROFILE_UPDATED: "Your profile has been updated successfully.",
        PROFILE_IMAGE_UPDATED: "Your profile image has been updated successfully.",
        PROFILE_DELETED: "Your profile has been deleted successfully.",
        NOT_VERIFIED: "Your email address is not verified.",
        INACTIVE: "Your email address is not active.",
        INVALID: "Please enter valid email & password."
    },
    STUDENT: {
        DELETED: 'Student has been deleted successfully.',
        UPDATED: 'Student has been updated successfully.',
        NOT_AVAILABLE: 'Student not available in our system.',
    },
    USER: {
        DELETED: 'User has been deleted successfully.',
        UPDATED: 'User has been updated successfully.',
        ADDED: 'User has been added successfully.',
        PROFILE_UPDATED: "Your profile has been updated successfully.",
        PROFILE_IMAGE_UPDATED: "Your profile image has been updated successfully.",
        PROFILE_DELETED: "Your profile has been deleted successfully.",
        NOT_VERIFIED: "Your email address is not verified.",
        INACTIVE: "Your email address is not active.",
        INVALID: "Please enter valid email & password."
    },
    CUSTOMER: {
        CUSTOMER_UPDATED: "Your customer has been updated successfully."
    },
    ROLE: {
        ROLE_ADD: "Role has been added successfully.",
        ROLE_UPDATE: "Role has been updated successfully.",
        ROLE_DELETE: "Role has been deleted successfully.",
        ROLE_GET: "Role has been loaded successfully"
    },
    EXAM_TYPE: {
        EXAM_TYPE_ADD: "Exam type has been added successfully.",
        EXAM_TYPE_UPDATE: "Exam type has been updated successfully.",
        EXAM_TYPE_DELETE: "Exam type has been deleted successfully.",
        EXAM_TYPE_GET: "Exam type has been loaded successfully"
    },
    QUESTION_TYPE: {
        QUESTION_TYPE_ADD: "Question type has been added successfully.",
        QUESTION_TYPE_UPDATE: "Question type has been updated successfully.",
        QUESTION_TYPE_DELETE: "Question type has been deleted successfully.",
        QUESTION_TYPE_GET: "Question type has been loaded successfully"
    },
    REQUEST: {
        LIST: "Request has been loaded successfully.",
        DELETED: "Request has been deleted successfully.",
        NOT_FOUND: "Provided request doesn't exist."
    },
    PAGE: {
        PAGE_ADD: "Your page has been added successfully.",
        PAGE_UPDATE: "Your page has been updated successfully.",
        PAGE_DELETE: "Your page has been deleted successfully.",
        PAGE_GET: "Page has been loaded successfully"
    },
    DESIGNATION: {
        ADDED: "Designation has been added successfully.",
        UPDATED: "Designation has been updated successfully.",
        DELETED: "Designation has been deleted successfully.",
        LOAD: "Designation has been loaded successfully"
    },
    OTP: {
        INVALID: "Incorrect OTP.",
        EXPIRE: "OTP is expired. Please try again.",
        CORRECT: "OTP has been matched."
    },
    LEAVE_CONFIGURATION: {
        ADDED: "Leave configuration has been added successfully.",
        UPDATED: "Leave configuration has been updated successfully.",
        DELETED: "Leave configuration has been deleted successfully.",
        LOAD: "Leave configuration has been loaded successfully"
    },
    COUNTRY: {
        NOT_FOUND: "Provided country is not found"
    },
    STATE: {
        NOT_FOUND: "Provided state is not found"
    },
    CITY: {
        NOT_FOUND: "Provided city is not found"
    },
    VALIDATION: {
        REQUIRED: {
            CONFIRM_PASSWORD: "Please enter confirm password.",
            CURRENT_PASSWORD: "Please enter current password.",
            FIRST_NAME: "Please enter first name.",
            LAST_NAME: "Please enter last name.",
            TITLE: "Please enter title.",
            CONFIG_KEY: "Please enter configuration key.",
            CONFIG_VALUE: "Please enter configuration value.",
            CONFIG_SMTP: "Please enter port and server detail only for the emailSmtpDetail configuration.",
            RESET_TOKEN: "Please enter reset token.",
            USER_ID: "Please enter user id",
            USERNAME: "Please enter username.",
            TYPE: "Please enter clock type",
            START_DATE: "Please enter week start date",
            END_DATE: "Please enter week end date",
            ITEMS_PER_PAGE: "Per page is required",
            CURRENT_PAGE: "Current page is required",
            CUSTOMER_ID: "Missing customer id",
            KEYWORD: "Missing search keyword",
            ORDER_TRANSACTION_ID: "Missing transaction id",
            MOBILE_NUMBER: "Please enter valid mobile number",
            USER_ID: "Please enter user ID",
            ADDRESS: "Please enter address",
            ZIP_CODE: "Please enter zip code",
            STATE_ID: "Please enter state ID",
            COUNTRY_ID: "Please enter country ID",
            TABLE: "Please enter table name",
            STATUS: "Please enter valid status",
            ID: "Please enter id",
            LOCAL_PHONE1: "Please enter local phone1",
            EMAIL: "Please enter email",
            CITY: "Please enter city",
            COUNTRY: "Please enter country",
            STATE: "Please enter state",
            INVALID_EMAIL: "Invalid email address",
            ROLE: {
                ID: "Please enter role",
                TITLE: "Please enter role name",
                STATUS: "Please enter role status",
                DEFAULT_ROLE: "You can not delete default Role"
            },
            PRODUCT: {
                PRODUCT_ID: "Please enter product id",
                RATING: "Please enter rating",
                REVIEW_ID: "Please enter review id",
            },
        },
        VALID: {
            USERNAME: "Please enter valid username.",
            EMAIL: "Please enter valid email address.",
            PASSWORD: "Please enter valid password.",
            ROLE_ID: "Please enter role ID.",
            STATUS: "Please enter valid status.",
            TOKEN: "Please enter valid token.",
            IDENTITY_TOKEN: "Please enter valid identity token.",
            MODULE: "Please enter valid module",
            IMAGE_FILE_TYPE: "Only support jpeg,jpg,png,gif image types",
        },
        LENGTH: {
            USERNAME_MIN: "Username must be minimum of 4 character long.",
            USERNAME_MAX: "Username must be maximum of 16 character long.",
            PASSWORD: "Password must be minimum of 8 character long."
        },
        EXISTS: {
            ROLE: "There is already one role with Same name",
            DELIVERY_MATRIX: "There is already similar delivery matrix",
        },
    },
    LEAVES: {
        ADD: "Leaves has been added successfully.",
        NOT_FOUND: "Leaves is not available in our system.",
        UPDATE: "Leaves has been updated successfully.",
        DELETE: "Leaves has been deleted successfully."
    },
    LEAVE_TYPES: {
        ADD: "Leave types has been added successfully.",
        NOT_FOUND: "Leave types is not available in our system.",
        UPDATE: "Leave types has been updated successfully.",
        DELETE: "Leave types has been deleted successfully."
    },
    LEAVE_SUB_TYPES: {
        ADD: "Leave sub types has been added successfully.",
        NOT_FOUND: "Leave sub types is not available in our system.",
        UPDATE: "Leave sub types has been updated successfully.",
        DELETE: "Leave sub types has been deleted successfully."
    },
    LEAVE_SUB_TYPE_CHILDS: {
        ADD: "Leave sub type childs has been added successfully.",
        NOT_FOUND: "Leave sub type childs is not available in our system.",
        UPDATE: "Leave sub type childs has been updated successfully.",
        DELETE: "Leave sub type childs has been deleted successfully."
    },
    HOLIDAYS: {
        ADD: "Holidays has been added successfully.",
        NOT_FOUND: "Holidays is not available in our system.",
        UPDATE: "Holidays has been updated successfully.",
        DELETE: "Holidays has been deleted successfully."
    },
    SUBJECT: {
        ADDED: 'Subject has been added Successfully.',
        UPDATED: 'Subject has been updated Successfully.',
        DELETED: 'Subject has been deleted Successfully.',
        EXIST: 'Subject already exist in our system.',
        NOT_FOUND: 'Subject is not available in our system.'
    },
    EXAM: {
        ADDED: 'Exam has been added Successfully.',
        UPDATED: 'Exam has been updated Successfully.',
        DELETED: 'Exam has been deleted Successfully.',
        EXIST: 'Exam already exist in our system.',
        NOT_FOUND: 'Exam is not available in our system.',
        NOT_AVAILABLE: 'This type exam is not available please check your exam detail'
    },
    QUESTION: {
        ADDED: 'Question has been added Successfully.',
        UPDATED: 'Question has been updated Successfully.',
        DELETED: 'Question has been deleted Successfully.',
        EXIST: 'Question already exist in our system.',
        NOT_FOUND: 'Question is not available in our system.'
    },
    USER_EXAM_ENROLL: {
        ADDED: 'User exam enroll has been added Successfully.',
        UPDATED: 'User exam enroll has been updated Successfully.',
        DELETED: 'User exam enroll has been deleted Successfully.',
        EXIST: 'User exam enroll already exist in our system.',
        NOT_FOUND: 'User exam enroll is not available in our system.'
    },
    STANDARD: {
        STANDARD_ADD: "Standard has been added successfully.",
        STANDARD_UPDATE: "Standard has been updated successfully.",
        STANDARD_DELETE: "Standard has been deleted successfully.",
        STANDARD_GET: "Standard has been loaded successfully"
    },
};

// File Path
exports.PATHS = {
    IMAGES: {
        USERS: "/Users",
        CUSTOMERS: "/Customers",
        PRODUCTS: "/Products"
    }
};

// Generic Status
exports.STATUS = {
    NOTDELETED: 0,
    INACTIVE: 0,
    ACTIVE: 1,
    COMPLETE: 1,
    PENDING: 0,
    CLOSE: 1,
    DELETED: 1,
    APPROVE: 3,
    REJECTED: 4,
    COMPLETED: 5,
    DEFAULT: 1,
    NOT_DEFAULT: 0,
    TRUE: true,
    FALSE: false
};

// Leave Status
exports.LEAVE_STATUS = {
    PENDING: 0,
    APPROVED: 1,
    REJECTED: 2,
    CANCELLED: 3,
};

// User type
exports.ROLE_TYPES = {
    ADMIN: "Admin",
    TEACHERs: "Teachers",
    STUDENTS: "Students",
}

exports.ROLE_TYPES_ID = {
    ADMIN: 1,
    TEACHER: 2,
    STUDENTS: 3,
}

// User type
exports.EXAM_TYPES = {
    FINAL_EXAM: "final_exam",
    MID_EXAM: "mid_exam",
}

exports.EXAM_TYPES_ID = {
    FINAL_EXAM: 1,
    MID_EXAM: 2,
}
// User type
exports.QUESTION_TYPES = {
    MULTIPLE_CHOICE: "Multiple Choice",
    SINGLE_LINE: "Single Line"
}

exports.QUESTION_TYPES_ID = {
    MULTIPLE_CHOICE: 1,
    SINGLE_LINE: 2,
}


//Role Modules
exports.MODULES = {
    ROLES: "Roles",
    Teachers: "Teachers",
    Students: "Students",
    ADMIN: "Admin",
    QUESTIONS: "Questions",
    RESULT: "Result",
    TESTS: "Tests",
    SUBJECTS: 'Subjects',
}

// Role Permission
exports.ACCESS_TYPES = {
    READ: "read_access",
    WRITE: "write_access",
    DELETE: "delete_access",
};

//Image Paths
exports.IMG_FOLDER_NAME = {
    BANK_DETAILS: "/bankDetails",
    USERS: '/users',
    ADMINS: '/admins',
    USER_IDENTITIES: '/userIdentities',
    EVENTS: '/events',
    TEACHERS: '/teachers',
    STUDENTS: '/students'
}

// Gender
exports.GENDER = {
    MALE: 0,
    FEMALE: 1,
}