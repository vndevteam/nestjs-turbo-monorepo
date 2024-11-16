/* DO NOT EDIT, file generated by nestjs-i18n */

/* prettier-ignore */
import { Path } from "nestjs-i18n";
/* prettier-ignore */
export type I18nTranslations = {
    "app": {
        "common": {
            "internal_server_error": string;
            "entity_not_found": string;
            "validation": {
                "error": string;
                "is_empty": string;
                "is_string": string;
            };
            "error": {
                "unique_username": string;
                "unique_email": string;
                "unique_follow": string;
                "unique_tag": string;
                "unique_favorite": string;
                "unique_slug": string;
            };
        };
        "user": {
            "username_or_email_exists": string;
            "not_found": string;
            "exist": string;
        };
        "profile": {
            "not_found": string;
            "following_self": string;
            "already_followed": string;
            "not_followed": string;
        };
    };
};
/* prettier-ignore */
export type I18nPath = Path<I18nTranslations>;
