export enum ErrorCode {
  // Common Validation
  V000 = 'common.validation.error',

  // Validation
  V001 = 'validation.is_empty',
  V002 = 'validation.is_invalid',

  // Error
  E001 = 'app.user.username_or_email_exists',
  E002 = 'app.user.not_found',
  E101 = 'app.profile.not_found',
  E102 = 'app.profile.following_self',
  E103 = 'app.profile.already_followed',
}
