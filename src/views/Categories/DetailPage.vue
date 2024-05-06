<template>
  <div class="flex flex-col gap-8 pb-20">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-2xl font-bold">Categories</h1>
      <div class="flex gap-2">
        <BaseButton
          type="vanilla"
          @click="
            () => {
              console.log($route.params.id)
            }
          "
        >
          <i class="pi pi-pencil text-white" />
        </BaseButton>
        <BaseButton
          class="p-2 rounded text-neutral-100 bg-red-500 dark:bg-red-600 hover:bg-red-500/80 dark:hover:bg-red-600/80"
          @click="
            () => {
              console.log($route.params.id)
            }
          "
        >
          <i class="pi pi-trash text-white" />
        </BaseButton>
      </div>
    </div>

    <div class="flex flex-col w-fit gap-4 p-4 rounded bg-neutral-200 dark:bg-neutral-800">
      <div class="flex flex-row items-center">
        <label class="w-28" for="categoryId">ID</label>
        <BaseInput class="w-16" type="text" name="categoryIdField" id="categoryId" disabled />
      </div>
      <div class="flex flex-row items-center">
        <label class="w-28" for="name">Name</label>
        <BaseInput class="w-96" type="text" name="nameField" id="name" disabled />
      </div>
      <div class="flex flex-row items-center">
        <label class="w-28" for="creationAt">Creation At</label>
        <BaseInput type="text" name="creationAtField" id="creationAt" disabled />
      </div>
      <div class="flex flex-row items-center">
        <label class="w-28" for="updatedAt">Updated At</label>
        <BaseInput type="text" name="updatedAtField" id="updatedAt" disabled />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
</script>
