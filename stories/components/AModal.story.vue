<script setup lang="ts">
import AModal from "../../components/AModal.vue";
import AButton from "../../components/AButton.vue";
import AIcon from "../../components/AIcon.vue";
import { ref } from "vue";
import "../../index.scss";

const open = ref<string | false>(false);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <AButton @click="open = 'default'" color="grey"
        >Open default Modal</AButton
      >
      <AModal
        :open="open === 'default'"
        @close="open = false"
        title=".defaultTitle"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="small">
      <AButton @click="open = 'small'" color="tertiary-lightest"
        >Open Small Modal</AButton
      >
      <AModal
        :open="open === 'small'"
        @close="open = false"
        size="small"
        title=".smallTitle"
        subTitle=".smallSubTitle"
        action-alignement="center"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="medium">
      <AButton @click="open = 'medium'" color="tertiary-lighter"
        >Open Medium Modal</AButton
      >
      <AModal
        :open="open === 'medium'"
        @close="open = false"
        size="medium"
        title=".mediumTitle"
        subTitle=".mediumSubTitle"
        action-alignement="right"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="large">
      <AButton @click="open = 'large'" color="tertiary-light"
        >Open Large Modal</AButton
      >
      <AModal
        :open="open === 'large'"
        @close="open = false"
        size="large"
        title=".largeTitle"
        subTitle=".largeSubTitle"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="big">
      <AButton @click="open = 'big'" color="tertiary">Open Big Modal</AButton>
      <AModal
        :open="open === 'big'"
        @close="open = false"
        size="big"
        title=".bigTitle"
        subTitle=".bigSubTitle"
        action-alignement="center"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="giant">
      <AButton @click="open = 'giant'" color="tertiary-dark"
        >Open Giant Modal</AButton
      >
      <AModal
        :open="open === 'giant'"
        @close="open = false"
        size="giant"
        title=".giantTitle"
        subTitle=".giantSubTitle"
        action-alignement="right"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="full">
      <AButton @click="open = 'full'" color="tertiary-darker"
        >Open Full Modal</AButton
      >
      <AModal
        :open="open === 'full'"
        @close="open = false"
        size="full"
        title=".fullTitle"
        subTitle=".fullSubTitle"
        action-alignement="right"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="no header">
      <AButton @click="open = 'noHeader'" color="warning"
        >Open no header Modal</AButton
      >
      <AModal
        :open="open === 'noHeader'"
        @close="open = false"
        title=".noHeaderTitle"
        subTitle=".noHeaderSubTitle"
        :has-header="false"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="no footer">
      <AButton @click="open = 'noFooter'" color="warning-dark"
        >Open no footer Modal</AButton
      >
      <AModal
        :open="open === 'noFooter'"
        @close="open = false"
        title=".noFooterTitle"
        subTitle=".noFooterSubTitle"
        :has-footer="false"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="top position">
      <AButton @click="open = 'top'" color="success-lighter"
        >Open top position Modal</AButton
      >
      <AModal
        :open="open === 'top'"
        @close="open = false"
        title=".topTitle"
        subTitle=".topSubTitle"
        position="top"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="right position">
      <AButton @click="open = 'right'" color="success-light"
        >Open right position Modal</AButton
      >
      <AModal
        :open="open === 'right'"
        @close="open = false"
        title=".rightTitle"
        subTitle=".rightSubTitle"
        position="right"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="bottom position">
      <AButton @click="open = 'bottom'" color="success"
        >Open bottom position Modal</AButton
      >
      <AModal
        :open="open === 'bottom'"
        @close="open = false"
        title=".bottomTitle"
        subTitle=".bottomSubTitle"
        position="bottom"
        size="giant"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="left position">
      <AButton @click="open = 'left'" color="success-dark"
        >Open left position Modal</AButton
      >
      <AModal
        :open="open === 'left'"
        @close="open = false"
        title=".leftTitle"
        subTitle=".leftSubTitle"
        position="left"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>
    <Variant title="icon">
      <AButton @click="open = 'icon'" color="info">Open icon Modal</AButton>
      <AModal
        :open="open === 'icon'"
        @close="open = false"
        title=".iconTitle"
        subTitle=".iconSubTitle"
        icon="arrow_back"
      >
        <template #header> Content header </template>
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>
    <Variant title="right-content">
      <AButton @click="open = 'rightContent'" color="info"
        >Open right content Modal</AButton
      >
      <AModal
        :open="open === 'rightContent'"
        @close="open = false"
        title=".rightContentTitle"
        subTitle=".rightContentSubTitle"
      >
        <template #right-content>
          <AButton class="small">
            <AIcon icon="more_horiz" color="black" />
          </AButton>
        </template>
        <template #header> Content header </template>
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="hasBodyPadding">
      <AButton @click="open = 'hasBodyPadding'" color="danger"
        >Open no body padding Modal</AButton
      >
      <AModal
        :open="open === 'hasBodyPadding'"
        @close="open = false"
        title=".hasBodyPaddingTitle"
        subTitle=".hasBodyPaddingSubTitle"
        :hasBodyPadding="false"
      >
        <template #right-content>
          <AButton class="small">
            <AIcon icon="more_horiz" color="black" />
          </AButton>
        </template>
        <template #header> Content header </template>
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="noclose">
      <AButton @click="open = 'noclose'" color="primary-light"
        >Open no close Modal</AButton
      >
      <AModal
        :open="open === 'noclose'"
        @close="open = false"
        title=".nocloseTitle"
        subTitle=".nocloseSubTitle"
        :noclose="true"
      >
        <template #header> Content header </template>
        <template #content> Content test </template>
        <template #action>
          <AButton @click="open = false" color="success">Validate</AButton>
        </template>
      </AModal>
    </Variant>
  </Story>
</template>

<docs lang="md">
# AModal

This is a modal component.

## Usage

The `AModal` component provides the following options:

- `title` (string, optional): Specifies the title of modal.
- `subTitle` (string, optional): Specifies the subtitle of the modal.
- `size` (string, optional): Specifies the size of the modal. Possible values are `small`, `medium`, `large`, `big`, and `giant`.
- `position` (string, optional): Specifies the position of the modal. Possible values are `top`, `right`, `bottom`, and `left`.
- `icon` (string, optional): Specifies the icon of the modal.
- `title-alignement` (string, optional): Specifies the position of the title. Possible values are `center` and `right`.
- `action-alignement` (string, optional): Specifies the position of the actions. Possible values are `center` and `right`.
- `open` (boolean, required): Specifies whether the modal is open or not.
- `rounded` (boolean, optional): Specifies if the modal is rounded.
- `noscroll` (boolean, optional): Specifies if the modal has a scroll.
- `noclose` (boolean, optional): Specifies if the modal has a close button.
- `cancel-label` (string, optional): Specifies the label of the cancel button.
- `class-list` (string, optional): Specifies the class list of the modal.
- `confirmation` (boolean, optional): Specifies if the modal is a confirmation modal.
- `has-header` (boolean, optional): Specifies if the modal has a header.
- `has-footer` (boolean, optional): Specifies if the modal has a footer.
- `right-content` (slot, optional): Specifies the right content of the modal.
- `hasBodyPadding` (boolean, optional): Specifies if the modal has body padding.

## Slots

- `header` (optional): Specifies the header slot.
- `right-content` (optional): Specifies the right content slot.
- `content` (optional): Specifies the content slot.
- `action` (optional): Specifies the action slot.

## Events

- `close` (function, required): Specifies the function to close the modal.
</docs>
