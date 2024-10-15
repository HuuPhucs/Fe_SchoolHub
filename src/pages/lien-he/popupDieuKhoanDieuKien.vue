<script setup lang="ts">
import { DanhSachTrangTinh } from '@/Constants/enums';
import DieuKhoanService from '@/services/dieuKhoan.service';
import { onBeforeMount } from 'vue';

const dieuKhoan = ref();
onBeforeMount(async () => {
    const res = await DieuKhoanService.getById(DanhSachTrangTinh.LienHe);
    dieuKhoan.value = res;
})

const showDialog = ref(false);

const onCloseDialogIconClicked = () => {
    showDialog.value = false;
};

const showPopupDieuKhoanClick = async () => {
    showDialog.value = true;
};
defineExpose({
    showPopupDieuKhoanClick,
    onCloseDialogIconClicked
});
const emit = defineEmits(['onAcceptClick', 'onCancelClick'],);
const onAcceptClick = () => {
    emit('onAcceptClick');
};
const onCancelClick = () => {
    onCloseDialogIconClicked();
    emit('onCancelClick');
};
</script>

<template>
   <v-dialog v-model="showDialog" persistent transition="dialog-top-transition" class="popup_dieukhoan">
    <DialogCloseBtn @click="onCloseDialogIconClicked" class="DieuKhoanDialogCloseBtn"/>
        <v-sheet class="popup__dieukhoan-container">
            <h2 class="popup__dieukhoan-title">ĐIỀU KHOẢN VÀ ĐIỀU KIỆN</h2>
            
            <v-sheet class="dieuKhoan_content" v-html="dieuKhoan.caiDatTongThe[0].mota">

            </v-sheet>
            <v-row class="button__row">
                <button class="button__row-cancel" @click="onCancelClick">HỦY</button>
                <button class="button__row-accept" @click="onAcceptClick">CHẤP THUẬN</button>
            </v-row>
        </v-sheet>
    </v-dialog>
</template>

<style scoped>
.popup_dieukhoan {
    width: 80vw;
}
.DieuKhoanDialogCloseBtn {
    /* background-color: linear-gradient(to right, #F05A22, #FEB907) !important; */
    background-image: linear-gradient(to right, #F05A22, #FEB907);
    color: #fff !important;
}
.popup__dieukhoan-container {
    text-align: center !important;
    background-color: #fff;
    border-radius: 8px;
    padding-top: 30px !important;
    overflow-x: hidden !important;
}

.popup__dieukhoan-title {
    color: #005BAA;
}

.popup__dieukhoan-context {
    text-align: justify;
    padding: 0 20px;
}

.popup__dieukhoan-context h4 {
    color: #005BAA;
}
.button__row {
    display: flex;
    justify-content: end;
    padding-right: 30px;
    padding-bottom: 20px;
}

/* .button__row-accept, .button__row-cancel {
    background-color: rebeccapurple;
} */
.button__row-accept {
    padding: 8px 16px;
    background-color: #005BAA;
    border-radius: 6px;
    color: #fff;
}
.button__row-cancel {
    padding: 8px 16px;
    margin-right: 10px;
    background-color: #A8AAAE29;
    border-radius: 6px;
}
.dieuKhoan_content {
    text-align: start;
    padding: 0 30px;
}
</style>
