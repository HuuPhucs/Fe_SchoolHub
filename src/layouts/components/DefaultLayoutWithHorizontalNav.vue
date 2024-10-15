<script lang="ts" setup>
import getNavItems from '@/navigation'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { themeConfig } from '@themeConfig'
import { onBeforeMount, ref } from "vue";

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import { HorizontalNavLayout } from '@layouts'
import HorizontalNav from "@layouts/components/HorizontalNav.vue";
import {HorizontalNavItems} from "@layouts/types";
import {ContentWidth} from "@layouts/enums";
import NavBarI18n from "@/layouts/components/NavBarI18n.vue";

const { appRouteTransition, appContentWidth } = useThemeConfig()
appContentWidth.value = ContentWidth.Boxed;

const navItems = ref([]);

const userInfo = ref();
// userInfo.value = {
//   hoTen: "Hoàng Trí Dũng",
//   anhDaiDien: "https://secure.gravatar.com/avatar/76dc90601db566f68e8c16d4f9b0735f?s=80&d=identicon"
// };

onBeforeMount(async () => {
  navItems.value = await getNavItems();
});
</script>

<template>
  <HorizontalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar>
      <RouterLink to="/" class="app-logo d-flex align-center gap-x-3"
      >
        <img src="../../assets/images/logo/NSPS-logo-01.png" alt="Tiểu học Nguyễn Siêu"/>
      </RouterLink>
      <VSpacer />
      <!-- 👉 Navigation -->
      <div class="layout-horizontal-nav">
        <div class="horizontal-nav-content-container">
          <HorizontalNav :nav-items="navItems" />
        </div>
      </div>
      <NavBarI18n class="me-1" />
      <UserProfile :user-info="userInfo"/>
      
      <a href="https://nguyensieu.edu.vn/" 
         target="_blank" 
         class="app-logo d-flex align-center gap-x-3 ms-4"
      >
        <img src="../../assets/images/logo/NSS-logo-header.jpg" alt="Tiểu học Nguyễn Siêu"/>
      </a>
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
  </HorizontalNavLayout>
</template>

<style lang="scss">

</style>
