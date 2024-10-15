<script lang="ts" setup>
// ℹ️ Using import from `@layouts` causing build to hangup
// import { useLayouts } from '@layouts'
import { Vue3Marquee } from 'vue3-marquee'
import TinTucService from '@/services/tinTuc.service'
import { useLayouts } from '@layouts/composable/useLayouts'
import NavBarI18n from "@/layouts/components/NavBarI18n.vue";

defineProps<{

  // navItems: HorizontalNavItems
}>()

const { y: windowScrollY } = useWindowScroll()
const { width: windowWidth } = useWindowSize()

const router = useRouter()
const shallShowPageLoading = ref(false)

// const listMarquee = ref([])
// onBeforeMount(async () => {
//   const tinNoiBat = await TinTucService.GetAllTinNoiBat()
//
//   listMarquee.value = tinNoiBat.map(item => {
//     return {
//       text: item.tieuDe,
//       url: `/tin-tuc/${item.id}`,
//     }
//   })
// })

router.beforeEach(() => {
  shallShowPageLoading.value = true
})
router.afterEach(() => {
  shallShowPageLoading.value = false
})

const { _layoutClasses: layoutClasses, isNavbarBlurEnabled } = useLayouts()
</script>

<template>
  <div
    class="layout-wrapper"
    :class="layoutClasses(windowWidth, windowScrollY)"
  >
<!--    <div class="header-top">-->
<!--      <div class=" navbar-content-container">-->
<!--        <div class="marquee">-->
<!--          <Vue3Marquee-->
<!--            :pause-on-hover="true"-->
<!--          >-->
<!--            <a-->
<!--              v-for="(item, index) of listMarquee"-->
<!--              :key="index"-->
<!--              :href="item.url"-->
<!--              target="_blank"-->
<!--            >{{ item.text }}</a>-->
<!--          </Vue3Marquee>-->
<!--        </div>-->
<!--        -->
<!--        <div class="d-flex">-->
<!--          <NavBarI18n class="me-1" />-->
<!--          <a-->
<!--            href="https://nguyensieu.edu.vn/"-->
<!--            target="_blank"-->
<!--          >-->
<!--            <img-->
<!--              src="../../assets/images/logo/NSS-logo-header.png"-->
<!--              alt="Tiểu học Nguyễn Siêu"-->
<!--            >-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div
      class="layout-navbar-and-nav-container"
      :class="isNavbarBlurEnabled && 'header-blur'"
    >
      <!-- 👉 Navbar -->
      <div class="layout-navbar">
        <div class="navbar-content-container">
          <slot name="navbar" />
        </div>
      </div>
    </div>

    <main
      class=""
      style="background-color: #fff;"
    >
      <template v-if="$slots['content-loading']">
        <template v-if="shallShowPageLoading">
          <slot name="content-loading" />
        </template>
        <template v-else>
          <slot />
        </template>
      </template>
      <template v-else>
        <slot />
      </template>
    </main>

    <!-- 👉 Footer -->
    <footer class="layout-footer">
      <div class="footer-content-container">
        <slot name="footer" />
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
@use "@configured-variables" as variables;
@use "@layouts/styles/placeholders";
@use "@layouts/styles/mixins";

.layout-wrapper {
  .header-top {
    display: flex;
    background: #f1f8fb;
    padding-block: 9px;
    padding-inline: 0;

    .marquee {
      a {
        color: #191b25;
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
        line-height: 26px;
        padding-inline-end: 50px;
        text-decoration: underline;
      }
    }

    .language {
      display: flex;
      align-items: center;
      padding-inline-start: 80px;

      
    }
  }

  &.layout-nav-type-horizontal {
    display: flex;
    flex-direction: column;

    // // TODO(v2): Check why we need height in vertical nav & min-height in horizontal nav
    // min-height: 100%;
    min-block-size: calc(var(--vh, 1vh) * 100);

    .layout-navbar-and-nav-container {
      z-index: 1;
    }

    .layout-navbar {
      z-index: variables.$layout-horizontal-nav-layout-navbar-z-index;
      block-size: variables.$layout-horizontal-nav-navbar-height;

      // ℹ️ For now we are not independently managing navbar and horizontal nav so we won't use below style to avoid conflicting with combo style of navbar and horizontal nav
      // If we add independent style of navbar & horizontal nav then we have to add :not for avoiding conflict with combo styles
      // .layout-navbar-sticky & {
      //   @extend %layout-navbar-sticky;
      // }

      // ℹ️ For now we are not independently managing navbar and horizontal nav so we won't use below style to avoid conflicting with combo style of navbar and horizontal nav
      // If we add independent style of navbar & horizontal nav then we have to add :not for avoiding conflict with combo styles
      // .layout-navbar-hidden & {
      //   @extend %layout-navbar-hidden;
      // }
    }

    // 👉 Navbar
    .navbar-content-container {
      @include mixins.boxed-content;
    }

    // 👉   Content height fixed
    &.layout-content-height-fixed {
      max-block-size: calc(var(--vh) * 100);

      .layout-page-content {
        overflow: hidden;

        > :first-child {
          max-block-size: 100%;
          overflow-y: auto;
        }
      }
    }

    // 👉 Footer
    // Boxed content
    .layout-footer {
      .footer-content-container {
        @include mixins.boxed-content;

        block-size: auto;
      }
    }
  }

  // If both navbar & horizontal nav sticky
  &.layout-navbar-sticky.horizontal-nav-sticky {
    .layout-navbar-and-nav-container {
      position: sticky;
      inset-block-start: 0;
      will-change: transform;
    }
  }

  &.layout-navbar-hidden.horizontal-nav-hidden {
    .layout-navbar-and-nav-container {
      display: none;
    }
  }
}

// 👉 Horizontal nav nav
.layout-horizontal-nav {
  z-index: variables.$layout-horizontal-nav-z-index;

  // .horizontal-nav-sticky & {
  //   width: 100%;
  //   will-change: transform;
  //   position: sticky;
  //   top: 0;
  // }

  // .horizontal-nav-hidden & {
  //   display: none;
  // }

  .horizontal-nav-content-container {
    @include mixins.boxed-content(true);
  }
}
</style>
