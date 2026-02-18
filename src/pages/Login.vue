<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/services/auth";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Mail, Lock } from "lucide-vue-next";

// Images
const heroImage = new URL("@/assets/images/karimun.webp", import.meta.url).href;

const router = useRouter();

const email = ref("");
const password = ref("");
const remember = ref(false);
const error = ref("");

function handleLogin() {
  error.value = "";

  try {
    const user = login(email.value, password.value);
    console.log("Login sukses:", user);

    router.push("/"); // redirect dashboard
  } catch (err: any) {
    error.value = err.message;
  }
}
</script>

<template>
  <div class="min-h-screen grid grid-cols-2">
    <!-- Left -->
    <div class="flex items-center justify-center bg-muted p-10">
      <Card class="w-full max-w-md">
        <CardContent class="space-y-6 p-6">
          <div class="text-center space-y-2">
            <h1 class="text-2xl font-bold">Karimunjawa Travel</h1>
            <p class="text-muted-foreground text-sm">
              Welcome back! Please login to your account.
            </p>
          </div>

          <div class="space-y-4">
            <!-- email -->
            <div class="space-y-1">
              <label class="text-sm font-medium text-foreground">
                Email Address
              </label>

              <div class="relative">
                <Mail
                  class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                />
                <Input
                  v-model="email"
                  type="email"
                  placeholder="admin@karimunjawa.com"
                  class="pl-10 h-11 rounded-xl"
                />
              </div>
            </div>

            <!-- password -->
            <div class="space-y-1">
              <label class="text-sm font-medium text-foreground">
                Password
              </label>
              <div class="relative">
                <Lock
                  class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                />
                <Input
                  type="password"
                  v-model="password"
                  placeholder="Password"
                  class="pl-10 h-11 rounded-xl"
                />
              </div>
            </div>

            <!-- checkbox -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Checkbox v-model:checked="remember" />
                <span class="text-sm">Remember me</span>
              </div>
              <a class="text-sm text-primary">Forgot Password?</a>
            </div>

            <!-- Button Login -->
            <Button class="w-full" @click="handleLogin">
              Login to Dashboard →
            </Button>

            <p v-if="error" class="text-sm text-destructive text-center">
              {{ error }}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Right -->
    <div
      class="hidden md:flex items-center justify-center bg-cover bg-center text-white p-10"
      :style="{ backgroundImage: `url(${heroImage})` }"
    >
      <!-- <div class="max-w-md space-y-4">
        <h2 class="text-4xl text-black font-bold">
          Manage Your Island Business With Ease
        </h2>
        <p class="text-black/80">
          Streamline operations, track bookings, and grow your travel business.
        </p>
      </div> -->
    </div>
  </div>
</template>
