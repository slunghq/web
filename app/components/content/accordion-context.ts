import type { InjectionKey, Ref } from "vue";

export interface AccordionFamilyContext {
    openId: Ref<string | null>;
    register: (id: string, defaultOpen: boolean) => void;
    toggle: (id: string) => void;
}

export const accordionFamilyKey: InjectionKey<AccordionFamilyContext> =
    Symbol("accordion-family");
