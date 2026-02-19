<script setup lang="ts">
import { ref } from "vue";

// Router
import { useRouter } from "vue-router";

// Services
import { login } from "@/services/auth";

// Toast
import { useToast } from "@/components/ui/toast/use-toast";

// UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Icons
import { Mail, Lock } from "lucide-vue-next";

// Images
// const heroImage = new URL("@/assets/images/karimun.webp", import.meta.url).href;

const { toast } = useToast();

const router = useRouter();

const email = ref("");
const password = ref("");
const remember = ref(false);
const loading = ref(false);

async function handleLogin() {
  try {
    loading.value = true;

    const user = await login(email.value, password.value);

    toast({
      title: "Login Berhasil",
      description: "Selamat datang kembali di Dashboard.",
      variant: "success",
    });

    router.push("/");
  } catch (err: any) {
    toast({
      title: "Login Gagal",
      description: err.message || "Email atau password salah",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen grid grid-cols-1 bg-gray-25">
    <!-- LEFT SIDE -->
    <div class="flex items-center justify-center p-6 md:p-10">
      <Card
        class="w-full max-w-md rounded-2xl shadow-xl border border-gray-100 bg-white"
      >
        <CardContent class="space-y-8 p-8">
          <!-- Title -->
          <div class="text-center space-y-3">
            <h1 class="text-3xl font-bold tracking-tight">
              Karimunjawa Travel
            </h1>
            <p class="text-muted-foreground text-sm">
              Welcome back! Please login to your account.
            </p>
          </div>

          <!-- Form -->
          <div class="space-y-5">
            <!-- Email -->
            <div class="space-y-2">
              <label class="text-sm font-medium"> Email Address </label>

              <div class="relative">
                <Mail
                  class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                />

                <Input
                  v-model="email"
                  type="email"
                  placeholder="admin@karimunjawa.com"
                  class="pl-10 h-11 rounded-xl border-gray-200 hover:border-indigo-300 focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label class="text-sm font-medium"> Password </label>

              <div class="relative">
                <Lock
                  class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                />

                <Input
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  class="pl-10 h-11 rounded-xl border-gray-200 hover:border-indigo-300 focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <!-- Remember -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Checkbox v-model:checked="remember" />
                <span class="text-sm text-muted-foreground"> Remember me </span>
              </div>

              <a class="text-sm text-indigo-600 hover:underline cursor-pointer">
                Forgot Password?
              </a>
            </div>

            <!-- Login Button -->
            <Button
              class="w-full h-11 text-sm font-semibold text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              @click="handleLogin"
            >
              {{ loading ? "Logging in..." : "Login to Dashboard →" }}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
