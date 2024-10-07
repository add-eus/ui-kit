import { defineSetupVue3 } from "@histoire/plugin-vue";
import { createI18n } from "vue-i18n";

export const setupVue3 = defineSetupVue3(({ app, story, variant }) => {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    messages: {
      en: {
        hello: "Hello",
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
      fr: {
        hello: "Bonjour",
        cancel: "Annuler",
        validate: "Valider",
        date: "Date",
        days: {
          monday: "Lun.",
          tuesday: "Mar.",
          wednesday: "Mer.",
          thursday: "Jeu.",
          friday: "Ven.",
          saturday: "Sam.",
          sunday: "Dim.",
        },
      },
    },
  });
  app.use(i18n);
});
