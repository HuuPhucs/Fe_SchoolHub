<script setup lang="ts">
import { IYeuCauLienHe } from '@/pages/lien-he/types';
import YeuCauLienHeService from '@/services/lienHe.service';
import { useToast } from 'vue-toastification';
import {emailValidator, phoneNumberValidator, requiredValidator} from "@/@core/utils/validators";
import { VForm } from "vuetify/lib/components/index.mjs";
import { ref } from "vue";
import PopupDieuKhoanDieuKien from './popupDieuKhoanDieuKien.vue';
import BoPhanLienHeService from '@/services/boPhanLienHe.service';


const toast = useToast();
const departments = ref([]);
const terms = ref(false);
const refVForm = ref<VForm>();
const instance = getCurrentInstance();
const onPopupDieuKhoanClick = (event) => {
  event.preventDefault();
  instance?.refs.popupDieuKhoanDieuKien.showPopupDieuKhoanClick();
}

const yeuCauLienHe = ref<IYeuCauLienHe>({});

onBeforeMount(async () => {
  const data = await BoPhanLienHeService.getAllAvailable()
  if (data) {
    departments.value = data
  }
})

const submitForm = async () => {
  let hasError = false;

  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (
    yeuCauLienHe.value.soDienThoai == "" ||
    !/(84|0[35789])[0-9]{8}\b/.test(yeuCauLienHe.value.soDienThoai)
  )
    hasError = true;

  if (yeuCauLienHe.value.email == "" || !res.test(yeuCauLienHe.value.email))
    hasError = true;
  if (terms.value == "") {
    toast.error("Bạn chưa đồng ý với điều khoản của chúng tôi");
    hasError = true;
  }

  if (!hasError) {
    await YeuCauLienHeService.createYeuCauLienHe(yeuCauLienHe.value);
    yeuCauLienHe.value = {};
    toast.success("Đã tạo yêu cầu thành công");
  }
};

const submitClick = () => {
  refVForm.value?.validate().then(({ valid: isValid }: { valid: boolean }) => {
    submitForm();
  });
};

const onAcceptClick = () => {
  terms.value = true;
  instance?.refs.popupDieuKhoanDieuKien.onCloseDialogIconClicked();
}
const onCancelClick = () => {
  terms.value = false;
}

const breadcrumbsItems = ref([
  {
    title: 'Trang chủ',
    disabled: false,
    href: '/',
  },
  {
    title: 'Liên hệ',
    disabled: true,
  }
]);
const placeholder = ref('Bộ phận liên hệ');
</script>

<template>
  <page-content :breadcrumbs-items="breadcrumbsItems" 
                title="Liên hệ với chúng tôi"
                class="pb-10"
                style="background-color: #fff"
  >
    <content-container>
      <VForm ref="refVForm">
      <v-row justify="center">
        <v-col cols="8">
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                v-model="yeuCauLienHe.hoTen"
                label="Họ và tên"
                :rules="[requiredValidator]"
              />
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                v-model="yeuCauLienHe.email"
                label="Email"
                :rules="[requiredValidator, emailValidator]"
              />
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                v-model="yeuCauLienHe.soDienThoai"
                label="Số điện thoại"
                :rules="[requiredValidator, phoneNumberValidator]"
              />
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6">
              <VSelect
                :items="departments"
                v-model="yeuCauLienHe.boPhanLienHeId"
                item-value="id"
                item-title="tenBoPhan"
                :return-object="false"
                persistent-placeholder=true
                placeholder="Bộ phận liên hệ"
                :rules="[requiredValidator]"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="yeuCauLienHe.noiDungLienHe"
                label="Lời nhắn"
                :rules="[requiredValidator]"
              />
            </v-col>
            
          </v-row>

          <v-row>
            <v-col style="display: flex;">
              <v-checkbox 
                v-model="terms" 
                class="ckbTerms"
              >
                <template #label>
                  <div class="checkbox-label">
                    <span>Tôi đã đọc và đồng ý với các </span>
                    <a href="" @click="onPopupDieuKhoanClick">điều khoản và điều kiện</a>
                  </div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
          
          <v-row justify="center">
            <v-btn @click="submitClick">
              Gửi
            </v-btn>
          </v-row>

          <v-row class="my-6">
            <v-col>
              Xin vui lòng kiểm tra thư mục spam trong trường hợp không nhận được email xác nhận
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </VForm>


      <v-row class="infor-row">
          <v-col cols="12" md="8" sm="8" lg="8" class="infor__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.3875830542925!2d105.78741997512883!3d21.017172380629283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab58c78690f7%3A0x120cddd55b29e496!2zVHLGsOG7nW5nIFRp4buDdSBo4buNYywgVEhDUyAmIFRIUFQgTmd1eeG7hW4gU2nDqnU!5e0!3m2!1svi!2s!4v1689135574914!5m2!1svi!2s"
              frameborder="0" class="map">
            </iframe>
          </v-col>

          <v-col cols="12" md="4" sm="4" lg="4" class="infor__context">
            <div class="infor-detail">
              <h2 class="text-uppercase text-primary">TRƯỜNG TIỂU HỌC NGUYỄN SIÊU</h2>
              <p class="infor-item">
                <IconBtn class="footer__icon">
                  <v-icon>mdi-map-marker-outline</v-icon>
                </IconBtn>
                <span class="infor-item-text">Phường Yên Hòa - Quận Cầu Giấy - Hà Nội</span>
              </p>
              <p class="infor-item">
                <IconBtn class="footer__icon">
                  <v-icon>mdi-phone</v-icon>
                </IconBtn>
              <div class="infor-item-text" style="display: inline-block;">
                <p>02437844889 </p>
                <p>8:00 - 17:00, Thứ 2 - Thứ 6</p>
              </div>
              </p>
              <p class="infor-item">
                <IconBtn class="footer__icon">
                  <v-icon>mdi-email-outline</v-icon>
                </IconBtn>
                <span class="infor-item-text">tieuhocnguyensieu@nsps.edu.vn</span>
              </p>
            </div>
          </v-col>
      </v-row>

    </content-container>
    
    <PopupDieuKhoanDieuKien ref="popupDieuKhoanDieuKien" @onCancelClick="onCancelClick" @onAcceptClick="onAcceptClick"></PopupDieuKhoanDieuKien>
  </page-content>
</template>

<style scoped>
@media screen and (max-width: 599px) {
  .infor__context {
    display: flex !important;
    justify-content: center;
  }
}

.ckbTerms {
  color: #0635AA !important;
}

.infor-row {
  width: 100%;
  height: 400px;
}

.map {
  width: 100%;
  height: 100%;
}

.infor-detail {
  height: 100%;
}

.infor-detail h2 {
  padding-bottom: 12px;
  font-size: 21.5px;
}

.infor-item {
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  color: #000;
}


.infor-item p {
  margin: 0;
}

.infor-item-text {
  margin-left: 8px;
}

.footer__icon {
  font-size: 16px;
  color: #fff;
  background-color: #F05A22;
}
</style>
