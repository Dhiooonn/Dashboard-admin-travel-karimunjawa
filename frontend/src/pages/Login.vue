<script setup lang="ts">
import { ref } from "vue";

// Router
import { useRouter } from "vue-router";

// UI Components
import { useToast } from "@/components/ui/toast/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Icons
import { Eye, EyeOff } from "lucide-vue-next";

// Services
import { login } from "@/services/auth";

// Assets
const heroImage = new URL("@/assets/images/karimun.jpg", import.meta.url).href;
const logoImage = new URL(
  "@/assets/images/karimunjawa-logo.png",
  import.meta.url,
).href;

// Composables
const { toast } = useToast();
const router = useRouter();

// State
const email = ref("");
const password = ref("");
const loading = ref(false);
const showPassword = ref(false);

// Methods
async function handleLogin() {
  if (!email.value || !password.value) {
    toast({
      title: "Input required",
      description: "Please enter your email and password.",
      variant: "destructive",
    });
    return;
  }

  try {
    loading.value = true;
    const user = await login(email.value, password.value);
    toast({
      title: "Login Berhasil",
      description: "Selamat datang kembali.",
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
  <div
    class="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4 md:p-8"
  >
    <!-- Main Card Container -->
    <div
      class="bg-white w-full max-w-[1000px] min-h-[600px] rounded-[32px] shadow-sm flex flex-col md:flex-row p-4 gap-4 md:gap-8"
    >
      <!-- Left Column (Image Background) -->
      <div
        class="hidden md:flex flex-col justify-between w-1/2 rounded-[24px] p-10 relative overflow-hidden bg-cover bg-center"
        :style="{ backgroundImage: `url(${heroImage})` }"
      >
        <!-- Dark overlay to ensure text is readable against the background image -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        ></div>

        <!-- Top Logo -->
        <div class="flex items-center gap-2 relative z-10">
          <img
            :src="logoImage"
            alt="Karimunjawa Logo"
            class="h-20 w-auto object-contain"
          />
        </div>

        <!-- Bottom Text -->
        <div class="relative z-10 max-w-[90%] mt-auto">
          <p class="text-[15px] font-medium text-white/90 mb-3">
            You can easily
          </p>
          <h2
            class="text-[32px] md:text-[36px] leading-[1.15] font-semibold text-white tracking-tight drop-shadow-md"
          >
            Get access your personal hub for clarity and productivity.
          </h2>
        </div>
      </div>

      <!-- Right Column (Form) -->
      <div
        class="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-12 py-8"
      >
        <div class="max-w-[400px] w-full mx-auto space-y-8">
          <!-- Header -->
          <div class="space-y-3">
            <!-- Top Logo -->
            <div class="flex items-center gap-2 relative z-10">
              <img
                :src="logoImage"
                alt="Karimunjawa Logo"
                class="h-12 w-auto object-contain"
              />
            </div>
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
              Sign in to account
            </h1>
            <p class="text-[14px] text-gray-500 leading-relaxed">
              Access your dashboard, bookings, and projects anytime, anywhere -
              and keep everything flowing in one place.
            </p>
          </div>

          <!-- Form Fields -->
          <div class="space-y-5">
            <!-- Email -->
            <div class="space-y-2">
              <label class="text-[13px] font-medium text-gray-900"
                >Your email</label
              >
              <Input
                v-model="email"
                type="email"
                placeholder="admin@karimunjawa.com"
                class="h-12 w-full px-4 rounded-xl border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-gray-300 text-[15px] placeholder:text-gray-300 shadow-sm transition-all"
              />
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label class="text-[13px] font-medium text-gray-900"
                >Password</label
              >
              <div class="relative">
                <Input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••••••"
                  class="h-12 w-full pl-4 pr-11 rounded-xl border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:border-gray-300 text-[15px] placeholder:text-gray-300 shadow-sm transition-all"
                  @keyup.enter="handleLogin"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                >
                  <EyeOff v-if="!showPassword" class="h-[18px] w-[18px]" />
                  <Eye v-else class="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>

            <!-- Login Button -->
            <div class="pt-2 flex flex-col gap-2">
              <Button
                class="w-full h-12 bg-[#0F1115] hover:bg-black text-white text-[15px] font-medium rounded-xl shadow-[0_8px_20px_-8px_rgba(255,107,53,0.3)] transition-all duration-300"
                @click="handleLogin"
                :disabled="loading"
              >
                {{ loading ? "Processing..." : "Sign In" }}
              </Button>
            </div>
          </div>

          <!-- Footer -->
          <div class="text-center pt-2">
            <p class="text-[13px] text-gray-500">
              Already have an account?
              <a href="#" class="text-[#FF6B35] font-medium hover:underline"
                >Register</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
