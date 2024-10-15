<script lang="ts" setup>
import { useThemeConfig } from '@core/composable/useThemeConfig'
import getNavItems from '@/navigation'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

// @layouts plugin
import { VerticalNavLayout } from '@layouts'
import {onBeforeMount, ref} from "vue";
import {ContentWidth} from "@layouts/enums";

const { appRouteTransition, isLessThanOverlayNavBreakpoint, appContentWidth } = useThemeConfig()
appContentWidth.value = ContentWidth.Fluid;
const { width: windowWidth } = useWindowSize()

const navItems = ref([]);

onBeforeMount(async () => {
  navItems.value = await getNavItems();
});
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          v-if="isLessThanOverlayNavBreakpoint(windowWidth)"
          id="vertical-nav-toggle-btn"
          class="ms-n3"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon
            size="26"
            icon="tabler-menu-2"
          />
        </IconBtn>

        <VSpacer />

        <UserProfile />
      </div>
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Transition
        :name="appRouteTransition"
        mode="out-in"
      >
        <Component :is="Component" />
      </Transition>
    </RouterView>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
<!--     <TheCustomizer /> -->
  </VerticalNavLayout>
</template>
