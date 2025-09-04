import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  defaultValidationMessages,
  vietnameseValidationMessages,
} from "./validation/message";

// Translation resources
const resources = {
  en: {
    translation: {
      // General translations
      "form.submit": "Submit",
      "form.cancel": "Cancel",
      "form.save": "Save",
      "form.loading": "Loading...",
      "form.success": "Success!",
      "form.error": "Error occurred",

      // Post form specific
      "post.title": "Title",
      "post.content": "Content",
      "post.summary": "Summary",
      "post.tags": "Tags",
      "post.published": "Published",
      "post.create": "Create Post",
      "post.update": "Update Post",
      "post.createSuccess": "Post created successfully!",
      "post.updateSuccess": "Post updated successfully!",

      // Validation messages
      ...defaultValidationMessages,
    },
  },
  vi: {
    translation: {
      // General translations
      "form.submit": "Gửi",
      "form.cancel": "Hủy",
      "form.save": "Lưu",
      "form.loading": "Đang tải...",
      "form.success": "Thành công!",
      "form.error": "Đã xảy ra lỗi",

      // Post form specific
      "post.title": "Tiêu đề",
      "post.content": "Nội dung",
      "post.summary": "Tóm tắt",
      "post.tags": "Thẻ",
      "post.published": "Đã xuất bản",
      "post.create": "Tạo bài viết",
      "post.update": "Cập nhật bài viết",
      "post.createSuccess": "Tạo bài viết thành công!",
      "post.updateSuccess": "Cập nhật bài viết thành công!",

      // Validation messages
      ...vietnameseValidationMessages,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
