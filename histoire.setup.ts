import { defineSetupVue3 } from "@histoire/plugin-vue";
import { createI18n } from "vue-i18n";

export const setupVue3 = defineSetupVue3(({ app, story, variant }) => {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    messages: {
      en: {
        datepicker: {
          cancel: "Cancel",
          validate: "Validate",
          date: "Date",
          days: {
            monday: "Mon.",
            tuesday: "Tue.",
            wednesday: "Wed.",
            thursday: "Thu.",
            friday: "Fri.",
            saturday: "Sat.",
            sunday: "Sun.",
          },
        },
      },
    },
  });
  app.use(i18n);
});
