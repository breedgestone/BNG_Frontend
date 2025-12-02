<script setup>
// About View
</script>

<template>
  <div class="about-page">
    <!-- Hero Section with Background Image -->
    <section class="hero-section relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center bg-cover bg-center"
      style="background-image: url('/aboutHero.jpg')">
      <div class="absolute inset-0 bg-black/50"></div>

      <div class="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div class="max-w-xl" data-aos="fade-up">
          <h1
            class="text-xl md:text-3xl  xl:text-5xl font-bold text-white sm:leading-tight leading-normal mb-6 md:mb-8 font-campton!">
            Empowering<br>
            Your Fitness<br>
            Journey
          </h1>
          <p class="text-base md:text-lg text-white/90 max-w-md">
            BNG Fitness Hub inspires, connects, and motivates every member to achieve their health and wellness goals.
          </p>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute sm:block hidden right-4 md:right-8 bottom--4 text-white transform rotate-90 text-sm tracking-wider">
        Stronger Every Day, Together.
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-8 sm:pt-16  bg-white">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-10 md:mb-16" data-aos="fade-up">
          <h2 class="text-xl md:text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Experience a gym that motivates, connects, and rewards you every step of your fitness journey.
          </p>
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <!-- Left Side - Text Content (2x2 Grid) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" data-aos="fade-right">
            <!-- Value -->
            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
                    fill="white" />
                  <path d="M17 7H7V9H17V7Z" fill="white" />
                  <path d="M14 11H7V13H14V11Z" fill="white" />
                  <path d="M17 15H7V17H17V15Z" fill="white" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">Value</h3>
                <p class="text-gray-600 text-sm md:text-base">
                  We inspire every member to embrace fitness, build consistency, and celebrate progress together,
                  creating a community that thrives.
                </p>
              </div>
            </div>

            <!-- Core Belief -->
            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L2 7V12C2 16.55 5.84 20.74 10.86 21.86C11.2 21.95 11.6 22 12 22C12.4 22 12.8 21.95 13.14 21.86C18.16 20.74 22 16.55 22 12V7L12 2ZM12 11.99H20C19.47 15.11 17.14 17.78 14 18.83V12H10V18.83C6.86 17.78 4.53 15.11 4 11.99H12Z"
                    fill="white" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">Core Belief</h3>
                <p class="text-gray-600 text-sm md:text-base">
                  We believe health is holistic, achievable, and more rewarding when shared, making every workout
                  meaningful and motivating.
                </p>
              </div>
            </div>

            <!-- Mission -->
            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2Z"
                    fill="white" />
                  <path d="M21 9H15V22H13V16H11V22H9V9H3V7H21V9Z" fill="white" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">Mission</h3>
                <p class="text-gray-600 text-sm md:text-base">
                  To provide a gym experience that connects, encourages, and rewards members while supporting their
                  fitness goals and personal growth.
                </p>
              </div>
            </div>

            <!-- Vision -->
            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
                    fill="white" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">Vision</h3>
                <p class="text-gray-600 text-sm md:text-base">
                  To become the most engaging and motivating fitness community where every individual feels seen,
                  supported, and empowered daily.
                </p>
              </div>
            </div>
          </div>

          <!-- Right Side - Image Grid -->
          <div class="grid grid-cols-2 gap-4 md:gap-6 h-[500px] md:h-[600px]" data-aos="fade-left">
            <!-- Left Column - Two stacked images -->
            <div class="flex flex-col gap-4 md:gap-6">
              <!-- Top Left Image -->
              <div class="rounded-2xl overflow-hidden h-1/2">
                <img src="@/assets/svg/womanworkingout.svg" alt="bng woman working out" class="w-full h-full object-cover">
              </div>
              
              <!-- Bottom Left Image -->
              <div class="rounded-2xl overflow-hidden h-1/2">
                <img src="@/assets/svg/guywithrope.svg" alt="bng guy with rope at the gym" class="w-full h-full  object-cover">
              </div>
            </div>

            <!-- Right Column - One tall image -->
            <div class="rounded-2xl overflow-hidden h-full">
              <img src="@/assets/svg/kneelingwoman.svg" alt="bng kneeling woman" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy Section -->
    <section class="py-8 sm:pt-16  bg-[#FEF5F5]">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-10 md:mb-16" data-aos="fade-up">
          <p class="text-primary text-sm md:text-base font-semibold mb-2">Our Philosophy</p>
          <h2 class="text-xl md:text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
            Creating a Fitness Community That<br class="hidden md:block">
            Inspires Growth and Belongin
          </h2>
        </div>

        <!-- Philosophy Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <!-- Member-Centered Approach -->
          <div class="bg-white rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="100">
            <div class="mb-6">
              <!-- Icon: Person with arms raised -->
              <svg class="w-16 h-16 md:w-20 md:h-20 mx-auto text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
              </svg>
            </div>
            <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Member-Centered<br>Approach
            </h3>
            <p class="text-gray-600 text-sm md:text-base">
              We focus on your goals, progress, and experience every step.
            </p>
          </div>

          <!-- Inclusive Environment (Highlighted) -->
          <div class="relative z-0 pt-4 pb-2 px-2" data-aos="fade-up" data-aos-delay="200">
            <!-- Tilted red border frame behind -->
            <div class="absolute inset-0  bg-primary rounded-[2.5rem] rotate-5"></div>
            
            <!-- Main white card -->
            <div class="relative z-10 bg-white rounded-[2.5rem] p-8 md:p-10 text-center shadow-lg">
              <div class="mb-6">
                <!-- Icon: Two people -->
                <svg class="w-16 h-16 md:w-20 md:h-20 mx-auto text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Inclusive Environment
              </h3>
              <p class="text-gray-600 text-sm md:text-base">
                Everyone is welcome, regardless of fitness level or background.
              </p>
            </div>
          </div>

          <!-- Commitment to Excellence -->
          <div class="bg-white rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="300">
            <div class="mb-6">
              <!-- Icon: Running person -->
              <svg class="w-16 h-16 md:w-20 md:h-20 mx-auto text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
              </svg>
            </div>
            <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Commitment to<br>Excellence
            </h3>
            <p class="text-gray-600 text-sm md:text-base">
              We maintain a premium gym experience with top-notch support.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- App Download Section -->
    <section class="app-download-section py-8 sm:pt-16 bg-white">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Left Side - Phone Mockup with Red Background -->
          <div class="order-2 lg:order-1" data-aos="fade-right">
            <div class="bg-primary rounded-3xl p-8 pb-0 flex justify-center items-center">
              <img src="@/assets/svg/phone.svg" alt="bng phone">
            </div>
          </div>

          <!-- Right Side - Content -->
          <div class="order-1 lg:order-2" data-aos="fade-left">
            <h2
              class="text-xl md:text-3xl  xl:text-4xl font-bold text-gray-900 sm:leading-tight leading-normal mb-6 md:mb-8 font-campton!">
              Stay motivated, track progress, and connect daily.
            </h2>
            <p class="text-base md:text-lg text-gray-600 mb-8 md:mb-10">
              Easily track your workouts, stay connected with the gym community, and celebrate your progress every day.
            </p>

            <!-- App Store Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <a href="#"
                class="inline-flex items-center justify-center gap-3 px-6 py-3 border text-gray-900 rounded-lg border-gray-300 hover:bg-gray-400 hover:text-white transition-colors">
                <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="57.3333" height="57.3333" rx="13.3333" fill="#2E2E2E" />
                  <path
                    d="M36.9222 28.8337C36.9077 26.4293 38.0275 24.6172 40.2891 23.281C39.0242 21.5183 37.1106 20.5487 34.5882 20.3619C32.1998 20.1786 29.5867 21.7157 28.6299 21.7157C27.6188 21.7157 25.3065 20.4253 23.4872 20.4253C19.7325 20.4818 15.7422 23.3374 15.7422 29.1474C15.7422 30.8644 16.0647 32.6377 16.7099 34.4639C17.5724 36.8683 20.682 42.7594 23.9257 42.6642C25.6218 42.6254 26.8214 41.4938 29.0286 41.4938C31.1705 41.4938 32.2795 42.6642 34.1714 42.6642C37.444 42.6184 40.2564 37.2632 41.0755 34.8517C36.6866 32.8386 36.9222 28.9571 36.9222 28.8337ZM33.1131 18.0809C34.9506 15.9585 34.7839 14.0266 34.7295 13.332C33.1059 13.4237 31.2285 14.4073 30.1594 15.6166C28.9815 16.9139 28.2893 18.518 28.4378 20.3266C30.192 20.4571 31.7939 19.5792 33.1131 18.0809Z"
                    fill="white" />
                </svg>


                <div class="text-left">
                  <div class="text-lg font-semibold">App Store</div>
                </div>
              </a>

              <a href="#"
                class="inline-flex items-center justify-center gap-3 px-6 py-3 border text-gray-900 rounded-lg border-gray-300 hover:bg-gray-400 hover:text-white transition-colors">
                <svg width="46" height="58" viewBox="0 0 46 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 5.34277C0 1.05677 4.79972 -1.47856 8.33984 0.9375L43.0049 24.5957C46.1069 26.7131 46.1069 31.2878 43.0049 33.4053L8.33984 57.0635C4.79972 59.4795 0 56.9442 0 52.6582V5.34277Z"
                    fill="#2E2E2E" />
                  <path d="M16.1121 47.5958L42.7152 28.5503L32.5985 21.5459L16.1121 47.5958Z" fill="#FBF9FF" />
                  <path d="M29.2263 19.211L16.4868 10.3906L25.1047 25.4499L29.2263 19.211Z" fill="#FBF9FF" />
                </svg>

                <div class="text-left">
                  <div class="text-lg font-semibold">Play Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

}
</style>