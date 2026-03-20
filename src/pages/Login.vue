<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "@/components/ui/toast/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-vue-next";
import { login } from "@/services/auth";

const heroImage = new URL("@/assets/images/karimun.jpg", import.meta.url).href;
const logoImage = new URL(
  "@/assets/images/karimunjawa-logo.png",
  import.meta.url,
).href;

const { toast } = useToast();
const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);
const showPassword = ref(false);

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
            <div class="pt-2">
              <Button
                class="w-full h-12 bg-[#0F1115] hover:bg-black text-white text-[15px] font-medium rounded-xl shadow-[0_8px_20px_-8px_rgba(255,107,53,0.3)] transition-all duration-300"
                @click="handleLogin"
                :disabled="loading"
              >
                {{ loading ? "Processing..." : "Sign In" }}
              </Button>
            </div>
          </div>

          <!-- Divider -->
          <div class="relative py-2">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t border-gray-100"></span>
            </div>
            <div class="relative flex justify-center text-[12px]">
              <span class="bg-white px-4 text-gray-400">or continue with</span>
            </div>
          </div>

          <!-- Social Buttons -->
          <div class="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              class="h-12 rounded-xl border-gray-200 text-gray-600 bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M47.2436 24.4988C47.2436 22.8413 47.0988 21.2325 46.8225 19.6875H24.4648V28.7738H37.2348C36.68 31.7113 35.035 34.225 32.54 35.8875V41.7675H40.2173C44.71 37.6438 47.2436 31.6425 47.2436 24.4988Z"
                  fill="#4285F4"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M24.4646 47.6975C30.8671 47.6975 36.2309 45.6012 40.2171 41.7675L32.5398 35.8875C30.3846 37.3312 27.6746 38.1675 24.4646 38.1675C18.2396 38.1675 12.9696 33.9875 11.0546 28.3612H3.14087V34.4638C7.05462 42.1938 15.1121 47.6975 24.4646 47.6975Z"
                  fill="#34A853"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.0547 28.3613C10.5597 26.8963 10.2797 25.3375 10.2797 23.7388C10.2797 22.14 10.5597 20.5813 11.0547 19.1163V13.0138H3.14099C1.52974 16.215 0.603485 19.8663 0.603485 23.7388C0.603485 27.6113 1.52974 31.2625 3.14099 34.4638L11.0547 28.3613Z"
                  fill="#FBBC05"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M24.4646 9.30875C27.9409 9.30875 31.0571 10.495 33.5159 12.8225L40.3859 5.9525C36.2184 2.08 30.8546 0 24.4646 0C15.1121 0 7.05462 5.50375 3.14087 13.2338L11.0546 19.3362C12.9696 13.71 18.2396 9.30875 24.4646 9.30875Z"
                  fill="#EA4335"
                />
              </svg>
            </Button>
            <Button
              variant="outline"
              class="h-12 rounded-xl border-gray-200 text-gray-900 bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.475 2 2 6.475 2 12C2 16.425 4.8625 20.1625 8.8375 21.4875C9.3375 21.575 9.525 21.275 9.525 21.0125C9.525 20.775 9.5125 19.9875 9.5125 19.15C6.7375 19.75 6.15 17.9625 6.15 17.9625C5.6875 16.8125 5.0375 16.5 5.0375 16.5C4.125 15.8875 5.1 15.9 5.1 15.9C6.1125 15.975 6.6375 16.9375 6.6375 16.9375C7.525 18.475 8.975 18.0375 9.5625 17.775C9.65 17.1 9.925 16.6625 10.225 16.4125C8.0125 16.1625 5.6875 15.3125 5.6875 11.475C5.6875 10.3875 6.075 9.4875 6.7 8.7875C6.6 8.525 6.2625 7.5125 6.8 6.1375C6.8 6.1375 7.625 5.875 9.525 7.1625C10.3125 6.9375 11.1625 6.8375 12 6.825C12.8375 6.8375 13.6875 6.9375 14.475 7.1625C16.375 5.8625 17.2 6.1375 17.2 6.1375C17.7375 7.5125 17.4 8.525 17.3 8.7875C17.925 9.4875 18.3125 10.375 18.3125 11.475C18.3125 15.325 15.975 16.1625 13.7625 16.4125C14.1375 16.7375 14.475 17.3875 14.475 18.375C14.475 19.8 14.4625 20.9375 14.4625 21.0125C14.4625 21.2875 14.65 21.5875 15.1625 21.4875C19.1375 20.1625 22 16.425 22 12C22 6.475 17.525 2 12 2Z"
                  fill="#111827"
                />
              </svg>
            </Button>
            <Button
              variant="outline"
              class="h-12 rounded-xl border-gray-200 text-gray-900 bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 384 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M318.7 268.7C318.5 232 335.1 204.3 368.7 183.9C349.9 157 321.5 142.2 284 139.3C248.5 136.5 209.7 160 195.5 160C180.5 160 146.1 140.3 119.1 140.3C80.2 140.3 20.9 183.9 20.9 272.6C20.9 311.9 35.3 353.8 48.1 390.5C65.6 427.2 111.8 517.2 160 515.7C185.2 515.1 203 497.8 235.8 497.8C267.6 497.8 284.1 515.7 312.2 515.7C360.8 515 402.6 433.2 414.8 396.4C349.6 365.7 353.1 306.4 353.1 304.5C353.1 304.5 318.7 268.7 318.7 268.7ZM262.1 104.5C289.4 72.1 286.9 42.6 286.1 32C262 33.4 234.1 48.4 218.2 66.9C200.7 86.7 190.4 111.2 192.6 138.8C218.7 140.8 242.5 127.4 262.1 104.5Z"
                  fill="black"
                />
              </svg>
            </Button>
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
