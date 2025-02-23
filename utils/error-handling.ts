// import { AuthErrorCodes } from 'firebase/auth';
import type { FirestoreErrorCode } from 'firebase/firestore';

export const firestoreErrorMessages = {
  cancelled: 'The operation was cancelled. Please try again if this was unintentional.',
  unknown: 'An unknown error occurred. Please refresh the page or try again later.',
  'invalid-argument': 'An invalid argument was provided. Please check your input and try again.',
  'deadline-exceeded': 'The operation took too long to complete. Please try again later.',
  'not-found':
    'The requested document could not be found. It might have been removed or does not exist.',
  'already-exists':
    'A document with the same identifier already exists. Please use a unique identifier.',
  'permission-denied':
    'You do not have permission to perform this action. Contact the administrator if you think this is a mistake.',
  'resource-exhausted': 'The system resources have been exhausted. Please try again later.',
  'failed-precondition':
    'The operation could not be completed due to an unmet precondition. Please check the requirements and try again.',
  aborted: 'The operation was aborted, likely due to a conflicting request. Please try again.',
  'out-of-range':
    'The operation was attempted outside the valid range. Please check your input and try again.',
  unimplemented:
    'The operation is not supported or has not been implemented yet. Please contact support for assistance.',
  internal: 'An internal server error occurred. Please try again later or report this issue.',
  unavailable:
    'The service is currently unavailable. Please check your connection or try again later.',
  'data-loss': 'Critical data loss occurred. Please contact support immediately.',
  unauthenticated: 'You are not authenticated. Please log in and try again.',
  default: 'An unknown error occurred.',
};

export const authErrorMessages = {
  'auth/admin-restricted-operation': 'This operation can only be performed by an administrator.',
  'auth/argument-error':
    'There was an issue with the provided input. Please check your details and try again.',
  'auth/app-not-authorized': 'This app is not authorized to access the authentication service.',
  'auth/app-not-installed': 'The app you are trying to use is not installed on your device.',
  'auth/captcha-check-failed': 'Captcha verification failed. Please try again.',
  'auth/code-expired': 'The code you entered has expired. Please request a new one.',
  'auth/cordova-not-ready':
    'The app is not ready to perform this operation. Please try again later.',
  'auth/cors-unsupported':
    'Your browser does not support cross-origin requests. Try using a different browser.',
  'auth/credential-already-in-use': 'This credential is already linked to another account.',
  'auth/custom-token-mismatch':
    'There was an issue with the provided custom token. Please try again.',
  'auth/requires-recent-login': 'For security reasons, please log in again to perform this action.',
  'auth/dependent-sdk-initialized-before-auth':
    'A required component was initialized before authentication. Please restart the app.',
  'auth/dynamic-link-not-activated': 'Dynamic linking is not enabled for this app.',
  'auth/email-change-needs-verification':
    'Please verify your email address before making this change.',
  'auth/email-already-in-use': 'This email is already associated with another account.',
  'auth/emulator-config-failed': 'There was an issue with the emulator configuration.',
  'auth/expired-action-code': 'The action code has expired. Please request a new one.',
  'auth/cancelled-popup-request': 'The popup request was canceled. Please try again.',
  'auth/internal-error': 'An unexpected error occurred. Please try again later.',
  'auth/invalid-api-key': 'The API key is invalid. Please check your configuration.',
  'auth/invalid-app-credential': 'The app credential is invalid. Please try again.',
  'auth/invalid-app-id': 'The provided app ID is invalid.',
  'auth/invalid-user-token': 'Your session has expired. Please log in again.',
  'auth/invalid-auth-event': 'There was an issue with the authentication event. Please try again.',
  'auth/invalid-cert-hash': 'The certificate hash is invalid.',
  'auth/invalid-verification-code': 'The verification code you entered is incorrect.',
  'auth/invalid-continue-uri': 'The continue URL is invalid or not allowed.',
  'auth/invalid-cordova-configuration':
    'There was an issue with the app configuration. Please try again.',
  'auth/invalid-custom-token': 'The custom token is invalid. Please try again.',
  'auth/invalid-dynamic-link-domain': 'The dynamic link domain is not valid.',
  'auth/invalid-email': 'The email address you entered is not valid.',
  'auth/invalid-emulator-scheme': 'The emulator configuration is not valid.',
  'auth/invalid-credential': 'The provided credential is invalid. Please try again.',
  'auth/invalid-message-payload': 'The message format is incorrect.',
  'auth/invalid-multi-factor-session': 'The multi-factor session is invalid.',
  'auth/invalid-oauth-client-id': 'The OAuth client ID is not valid.',
  'auth/invalid-oauth-provider': 'The OAuth provider is not supported.',
  'auth/invalid-action-code': 'The action code is invalid or expired.',
  'auth/unauthorized-domain': 'The domain is not authorized for authentication.',
  'auth/wrong-password': 'The password you entered is incorrect.',
  'auth/invalid-persistence-type': 'The selected persistence type is not supported.',
  'auth/invalid-phone-number': 'The phone number you entered is invalid.',
  'auth/invalid-provider-id': 'The provider ID is not valid.',
  'auth/invalid-recipient-email': 'The recipient email address is invalid.',
  'auth/invalid-sender': 'The sender email address is invalid.',
  'auth/invalid-verification-id': 'The verification ID is invalid.',
  'auth/invalid-tenant-id': 'The tenant ID is invalid.',
  'auth/multi-factor-info-not-found': 'Multi-factor information could not be found.',
  'auth/multi-factor-auth-required': 'Please complete multi-factor authentication to proceed.',
  'auth/missing-android-pkg-name': 'The Android package name is missing.',
  'auth/missing-app-credential': 'The app credential is missing.',
  'auth/auth-domain-config-required': 'The authentication domain configuration is required.',
  'auth/missing-verification-code': 'The verification code is missing.',
  'auth/missing-continue-uri': 'The continue URL is missing.',
  'auth/missing-iframe-start': 'An iframe start error occurred.',
  'auth/missing-ios-bundle-id': 'The iOS bundle ID is missing.',
  'auth/missing-or-invalid-nonce': 'The nonce is missing or invalid.',
  'auth/missing-multi-factor-info': 'Multi-factor information is missing.',
  'auth/missing-multi-factor-session': 'The multi-factor session is missing.',
  'auth/missing-phone-number': 'The phone number is missing.',
  'auth/missing-verification-id': 'The verification ID is missing.',
  'auth/app-deleted': 'The app has been deleted.',
  'auth/account-exists-with-different-credential':
    'An account already exists with a different credential.',
  'auth/network-request-failed':
    'A network error occurred. Please check your connection and try again.',
  'auth/null-user': 'No user is currently signed in.',
  'auth/no-auth-event': 'No authentication event was found.',
  'auth/no-such-provider': 'The requested provider does not exist.',
  'auth/operation-not-allowed': 'This operation is not allowed. Please check your configuration.',
  'auth/operation-not-supported-in-this-environment':
    'This operation is not supported in the current environment.',
  'auth/popup-blocked': 'The popup was blocked. Please allow popups and try again.',
  'auth/popup-closed-by-user': 'The popup was closed before completing the operation.',
  'auth/provider-already-linked': 'This provider is already linked to your account.',
  'auth/quota-exceeded': 'The quota for this operation has been exceeded. Please try again later.',
  'auth/redirect-cancelled-by-user': 'The redirect was canceled by the user.',
  'auth/redirect-operation-pending': 'A redirect operation is already in progress.',
  'auth/rejected-credential': 'The provided credential was rejected.',
  'auth/second-factor-already-in-use': 'This second factor is already enrolled.',
  'auth/maximum-second-factor-count-exceeded':
    'The maximum number of second factors has been reached.',
  'auth/tenant-id-mismatch': 'The tenant ID does not match.',
  'auth/timeout': 'The operation timed out. Please try again.',
  'auth/user-token-expired': 'Your session has expired. Please log in again.',
  'auth/too-many-requests': 'Too many requests were made. Please try again later.',
  'auth/unauthorized-continue-uri': 'The continue URL is not authorized.',
  'auth/unsupported-first-factor': 'The first factor is not supported.',
  'auth/unsupported-persistence-type': 'The persistence type is not supported.',
  'auth/unsupported-tenant-operation': 'The operation is not supported for this tenant.',
  'auth/unverified-email': 'Your email address is not verified.',
  'auth/user-cancelled': 'The operation was canceled by the user.',
  'auth/user-not-found': 'No user found with the provided details.',
  'auth/user-disabled': 'This user account has been disabled.',
  'auth/user-mismatch': 'The user details do not match.',
  'auth/user-signed-out': 'The user has been signed out.',
  'auth/weak-password': 'The password is too weak. Please use a stronger password.',
  'auth/web-storage-unsupported': 'Web storage is not supported in this environment.',
  'auth/already-initialized': 'The app has already been initialized.',
  'auth/recaptcha-not-enabled': 'ReCAPTCHA is not enabled.',
  'auth/missing-recaptcha-token': 'The ReCAPTCHA token is missing.',
  'auth/invalid-recaptcha-token': 'The ReCAPTCHA token is invalid.',
  'auth/invalid-recaptcha-action': 'The ReCAPTCHA action is invalid.',
  'auth/missing-client-type': 'The client type is missing.',
  'auth/missing-recaptcha-version': 'The ReCAPTCHA version is missing.',
  'auth/invalid-recaptcha-version': 'The ReCAPTCHA version is invalid.',
  'auth/invalid-req-type': 'The request type is invalid.',
  default: 'Error occured during authentication',
};

export const getFirestoreErrorMessage = (code: FirestoreErrorCode) => {
  return firestoreErrorMessages[code] || firestoreErrorMessages['default'];
};

export const getAuthErrorMessage = (code: keyof typeof authErrorMessages) => {
  return authErrorMessages[code] || authErrorMessages['default'];
};
