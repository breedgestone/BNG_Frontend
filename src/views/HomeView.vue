<script setup>
import { ref, onMounted } from 'vue'
import BngButton from '@/components/BngButton.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useSEO } from '@/composables/useSEO'
import { useSchema } from '@/composables/useSchema'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const swiperModules = [Navigation, Pagination, Autoplay]

// SEO Optimization
useSEO({
  title: 'BNG Fitness Hub - Transform Your Fitness Journey | Expert Trainers & Programs',
  description: 'Join BNG Fitness Hub and unlock your potential with 40+ expert trainers, 33+ fitness programs, and a thriving community of 970+ members. Build better habits with guided fitness support.',
  keywords: 'fitness gym, workout programs, personal trainers, fitness hub, gym membership, fitness community, workout classes, strength training',
  url: '/',
})

// Schema Markup
const { addSchema, getLocalBusinessSchema, getServiceSchema, getFAQSchema, getBreadcrumbSchema } = useSchema()

onMounted(() => {
  // Add Local Business Schema
  addSchema({
    '@graph': [
      getLocalBusinessSchema(),
      getServiceSchema(),
      getFAQSchema([
        {
          question: 'What are your membership plans?',
          answer: 'We offer three flexible plans: 24-hour full subscription (₦10,000/month), 4-hour session (₦2,000/session), and home workout subscription (₦1,000/month).'
        },
        {
          question: 'How many trainers do you have?',
          answer: 'BNG Fitness Hub has over 40 certified expert trainers specializing in various fitness disciplines including strength training, cardio, yoga, and personalized coaching.'
        },
        {
          question: 'Do you offer personal training sessions?',
          answer: 'Yes, we offer one-on-one personal training sessions with certified trainers who create customized workout plans based on your goals and fitness level.'
        },
        {
          question: 'What is the check-in reward system?',
          answer: 'Our gamified check-in system rewards you with points for every gym visit. Points can be redeemed for perks like protein shakes, trainer sessions, or gym merchandise.'
        }
      ]),
      getBreadcrumbSchema([
        { name: 'Home', url: 'https://www.bngfitness.com/' }
      ])
    ]
  })
})

// Image loading states
const imageLoaded = ref({})

const handleImageLoad = (key) => {
  imageLoaded.value[key] = true
}

const testimonials = [
  {
    text: "BNG Fitness Hub has completely changed the way I approach my workouts. The trainers are supportive, the community keeps me motivated, and the check-in rewards push me to stay consistent. I've seen real progress in my strength and confidence since joining, and I actually look forward to coming to the gym now.",
    author: "Sarah M.",
    role: "Member since 2022",
    image: null // Add image path when available
  },
  {
    text: "I've tried several gyms, but BNG Fitness Hub truly stands out. The trainers are knowledgeable and supportive, the equipment is always in great condition, and the community is incredibly motivating. I've never felt more encouraged to reach my fitness goals!",
    author: "John D.",
    role: "Member since 2021",
    image: null
  },
  {
    text: "The personalized workout plans and one-on-one coaching have been game-changers for me. I've achieved results I never thought possible, and the supportive environment makes every session enjoyable.",
    author: "Emily R.",
    role: "Member since 2023",
    image: null
  }
]
</script>

<template>
  <div class="home-page font-poppins bg-gray-100">
    <!-- Hero Section -->
    <section class="hero-section sm:py-16 py-8  ">
      <div class="container  flex flex-col items-center text-center mx-auto px-4 md:px-6 lg:px-8">
        <div class="max-w-5xl">
          <!-- Main Heading -->
          <h1
            data-aos="fade-up"
            class="text-xl md:text-3xl  xl:text-5xl font-bold text-gray-900 sm:leading-tight leading-normal mb-6 md:mb-8 font-campton!">
            Find Your Rhythm: Make Every Workout Count with
            <span class="text-primary">BNG Fitness Hub</span>
          </h1>

          <!-- Subheading -->
          <p data-aos="fade-up" data-aos-delay="100" class="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-10 ">
            Unlock Your Potential: Build Better Habits with Guided Fitness Support </p>

          <!-- CTA Button -->
          <div data-aos="fade-up" data-aos-delay="200" class="flex w-full justify-center sm:flex-row flex-col gap-4  mb-6 md:mb-16 items-center">

            <BngButton variant="primary" size="lg" class="w-full sm:w-auto md:w-[349px]">
              Get Started
            </BngButton>
            <BngButton variant="outline" size="lg" class="w-full  sm:w-auto md:w-[349px]">
              Book a Walk In
            </BngButton>
          </div>

          <!-- Stats -->
          <div data-aos="fade-up" data-aos-delay="300" class="grid grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="sm:text-3xl text-xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">40+</div>
              <div class="text-sm md:text-base text-gray-600">Expert Trainers</div>
            </div>
            <div class="text-center border-x border-gray-300">
              <div class="sm:text-3xl text-xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">970+</div>
              <div class="text-sm md:text-base text-gray-600">Members Joined</div>
            </div>
            <div class="text-center">
              <div class="sm:text-3xl text-xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">33+</div>
              <div class="text-sm md:text-base text-gray-600">Fitness Programs</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hero Images Section -->
    <section class="hero-images-section pb-8 sm:pb-16  ">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <!-- Left Image - Smaller, Portrait -->
          <div data-aos="fade-right" :class="['md:col-span-2 rounded-2xl overflow-hidden aspect-[2/4]', !imageLoaded['hero-1'] && 'bg-gray-200 animate-pulse']">
            <img 
              src="@/assets/images/basketBaller.webp" 
              alt="BNG Fitness Hub member doing dumbbell exercises in modern gym" 
              class="w-full h-full object-cover" 
              loading="eager"
              @load="handleImageLoad('hero-1')">
          </div>

          <!-- Center Image - Larger, Landscape -->
          <div data-aos="fade-up" data-aos-delay="100" :class="['md:col-span-6 rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[6/4]', !imageLoaded['hero-2'] && 'bg-gray-200 animate-pulse']">
            <img 
              src="@/assets/images/weightlifting.webp" 
              alt="Professional weightlifting training at BNG Fitness Hub" 
              class="w-full h-full object-cover" 
              loading="eager"
              @load="handleImageLoad('hero-2')">
          </div>

          <!-- Right Image - Smaller, Portrait -->
          <div data-aos="fade-left" data-aos-delay="200" :class="['md:col-span-4 rounded-2xl overflow-hidden aspect-[4/4]', !imageLoaded['hero-3'] && 'bg-gray-200 animate-pulse']">
            <img 
              src="@/assets/images/punchingbag.webp" 
              alt="Boxing and punching bag workout training at BNG gym" 
              class="w-full h-full object-cover" 
              loading="eager"
              @load="handleImageLoad('hero-3')">
          </div>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section class="about-section pb-8 sm:pb-16  bg-[#FCE9E580]">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <!-- Left Side - Content -->
          <div data-aos="fade-right">
            <h2
              class="text-xl md:text-3xl  xl:text-5xl font-bold text-gray-900 sm:leading-tight leading-normal mb-6 md:mb-8 font-campton!">
              About Us
            </h2>
            <p class="text-base mb-5  md:text-lg tracking-wider text-[#201E1E] ">
              BNG Fitness Hub isn’t just a gym — it’s a vibrant community of people who show up, improve daily, and
              inspire each other. From day one, our goal has been to empower members to build healthier habits and
              achieve long-term fitness success.
            </p>

            <BngButton variant="primary" size="lg" class="w-full sm:w-[349px]">
              Know More
            </BngButton>

          </div>

          <!-- Right Side - Image Grid -->
          <div class="grid grid-cols-3 gap-4 md:gap-6" data-aos="fade-left">
            <!-- Top Left Image - Portrait -->
            <div :class="['rounded-2xl overflow-hidden aspect-1/3', !imageLoaded['about-1'] && 'bg-gray-200 animate-pulse']">
              <img 
                class="h-full object-cover w-full" 
                src="@/assets/images/facinbackMan.webp" 
                alt="Focused athlete training at BNG Fitness Hub" 
                loading="lazy"
                @load="handleImageLoad('about-1')">
            </div>

            <!-- Top Right Image - Portrait -->
            <div :class="['rounded-2xl overflow-hidden aspect-1/3', !imageLoaded['about-2'] && 'bg-gray-200 animate-pulse']">
              <img 
                class="h-full object-cover w-full" 
                src="@/assets/images/prettygirl.webp" 
                alt="Female member doing fitness training at BNG gym" 
                loading="lazy"
                @load="handleImageLoad('about-2')">
            </div>

            <!-- Bottom Full Width - Landscape -->
            <div :class="['rounded-2xl overflow-hidden aspect-1/3', !imageLoaded['about-3'] && 'bg-gray-200 animate-pulse']">
              <img 
                class="h-full object-cover w-full" 
                src="@/assets/images/muscularguy.webp" 
                alt="Muscular athlete showing strength training results" 
                loading="lazy"
                @load="handleImageLoad('about-3')">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What Sets Us Apart Section -->
    <section class="features-section py-8 sm:py-16 ">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2
            class="text-xl md:text-3xl  xl:text-5xl font-bold text-gray-900 sm:leading-tight leading-normal mb-6 md:mb-8 font-campton!">
            What Sets Us Apart
          </h2>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <!-- Feature 1 -->
          <div class="border border-gray-200 p-4 rounded-lg" data-aos="fade-up" data-aos-delay="100">
            <div class="flex items-center gap-4 mb-4">
              <div class=" sm:text-2xl rounded-full text-gray-900 flex items-center justify-center font-bold text-xl">
                01
              </div>
              <div>
                <h3 class="border border-gray-300 p-2 rounded font-bold text-gray-900">
                  Community-Driven Fitness
                </h3>
              </div>
            </div>
            <p class="text-gray-600 text-sm md:text-base mb-6">
              Build connections with like-minded individuals who push you to be your best while celebrating every
              milestone together.
            </p>
            <div :class="['rounded-2xl overflow-hidden aspect-4/5', !imageLoaded['feature-1'] && 'bg-gray-200 animate-pulse']">
              <img 
                src="@/assets/svg/bicycledriving.svg" 
                alt="Group cycling class - community-driven fitness at BNG Hub" 
                class="w-full h-full object-cover" 
                loading="lazy"
                @load="handleImageLoad('feature-1')">
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="border border-gray-200 p-4 rounded-lg" data-aos="fade-up" data-aos-delay="200">
            <div class="flex items-center gap-4 mb-4">
              <div class=" sm:text-2xl rounded-full text-gray-900 flex items-center justify-center font-bold text-xl">
                02
              </div>
              <div>
                <h3 class="border border-gray-300 p-2 rounded font-bold text-gray-900">
                  Smart Workout Experience
                </h3>
              </div>
            </div>
            <p class="text-gray-600 text-sm md:text-base mb-6">
              Track your progress with our innovative app and equipment, making every session smarter and more rewarding
              than the last.
            </p>
            <div :class="['rounded-2xl overflow-hidden aspect-4/5', !imageLoaded['feature-2'] && 'bg-gray-200 animate-pulse']">
              <img 
                src="@/assets/svg/smartworkout.svg" 
                alt="Smart workout tracking technology at BNG Fitness Hub" 
                class="w-full h-full object-cover" 
                loading="lazy"
                @load="handleImageLoad('feature-2')">
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="border border-gray-200 p-4 rounded-lg" data-aos="fade-up" data-aos-delay="300">
            <div class="flex items-center gap-4 mb-4">
              <div class=" sm:text-2xl rounded-full text-gray-900 flex items-center justify-center font-bold text-xl">
                03
              </div>
              <div>
                <h3 class="border border-gray-300 p-2 rounded font-bold text-gray-900">
                  Trainers Who Support You
                </h3>
              </div>
            </div>
            <p class="text-gray-600 text-sm md:text-base mb-6">
              Work with certified trainers who understand your goals and guide you every step, ensuring proper form and
              motivation.
            </p>
            <div :class="['rounded-2xl overflow-hidden aspect-4/5', !imageLoaded['feature-3'] && 'bg-gray-200 animate-pulse']">
              <img 
                src="@/assets/images/solotrainer.webp" 
                alt="Certified personal trainer providing one-on-one guidance" 
                class="w-full h-full object-cover" 
                loading="lazy"
                @load="handleImageLoad('feature-3')">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Services Section -->
    <section class="services-section pb-8 sm:pb-16">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12 md:mb-16">
          <h2
            class="text-xl md:text-3xl  xl:text-5xl font-bold text-gray-900 sm:leading-tight leading-normal mb-4 font-campton!">
            Our Services
          </h2>
        </div>

        <!-- Services List -->
        <div class="space-y-16 md:space-y-24">
          <!-- Service 1 - Personalized Workout Plans -->
          <div class="flex flex-col gap-8 lg:gap-12 items-center">
            <div>
              <h3
                class="bg-[#FCE9E5] sm:w-fit w-full text-center text-lg font-bold font-campton! sm:p-4 p-2 rounded mb-4 ">
                Personalized Workout Plans
              </h3>
              <p class="text-base md:text-lg text-gray-600">
                Our expert trainers create customized fitness programs tailored to your individual goals and fitness
                level. Whether you're aiming to build muscle, lose weight, or boost stamina, your personalized plan
                empowers you to train smarter while staying motivated. Track your progress, adjust your regimen, and
                enjoy the freedom of working out on your terms with continuous support from our knowledgeable team.
              </p>
            </div>
            <div :class="['rounded-2xl overflow-hidden', !imageLoaded['service-1'] && 'bg-gray-200 animate-pulse']">
              <img src="@/assets/images/sweatingMan.webp" alt="bng sweatingMan" class="w-full h-full object-cover" @load="handleImageLoad('service-1')">
            </div>
          </div>
          <div class="flex flex-col gap-8 lg:gap-12 items-center">
            <div>
              <h3
                class="bg-[#FCE9E5] sm:w-fit w-full text-center text-lg font-bold font-campton! sm:p-4 p-2 rounded mb-4 ">
                Trainer Sessions & Coaching </h3>
              <p class="text-base md:text-lg text-gray-600">
                Our strength training program focuses on building muscle, improving endurance, and enhancing overall
                functional fitness. Whether you’re a beginner or an experienced lifter, our certified trainers will
                guide you through effective weightlifting routines. Our strength training program focuses Our trainer
                coaching service connects you with certified fitness experts who guide you through effective workouts
                and smart techniques. Whether you’re booking a quick session or a full one-hour slot, each trainer
                focuses on your form, safety, and long-term progress.
              </p>
            </div>
            <div :class="['rounded-2xl overflow-hidden', !imageLoaded['service-2'] && 'bg-gray-200 animate-pulse']">
              <img src="@/assets/images/runningMan.webp" alt="bng runningMan" class="w-full h-full object-cover" @load="handleImageLoad('service-2')">
            </div>
          </div>
          <div class="flex flex-col gap-8 lg:gap-12 items-center">
            <div>
              <h3
                class="bg-[#FCE9E5] sm:w-fit w-full text-center text-lg font-bold font-campton! sm:p-4 p-2 rounded mb-4 ">
                Gamified Check-ins & Rewards </h3>
              <p class="text-base md:text-lg text-gray-600">
                Our check-in and reward system turns consistency into motivation. Every visit earns you points that can
                be redeemed for perks like protein shakes, trainer sessions, or gym merchandise. This program encourages
                regular attendance and makes your fitness journey more engaging, giving you a fun and rewarding way to
                stay committed over time.
              </p>
            </div>
            <div :class="['rounded-2xl overflow-hidden', !imageLoaded['service-3'] && 'bg-gray-200 animate-pulse']">
              <img src="@/assets/images/weightrack.webp" alt="bng weightrack" class="w-full h-full object-cover" @load="handleImageLoad('service-3')">
            </div>
          </div>

          =
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section pb-8 sm:pb-16 bg-gray-50">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2
            class="text-xl md:text-3xl xl:text-5xl font-bold text-gray-900 sm:leading-tight leading-normal mb-6 md:mb-8 font-campton!">
            Testimonials
          </h2>
          <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Here some testimonies from our members
          </p>
        </div>

        <!-- Testimonial Content -->
        <div class="max-w-7xl mx-auto">
          <Swiper :modules="swiperModules" :slides-per-view="1" :space-between="30" :navigation="{
            nextEl: '.testimonial-next',
            prevEl: '.testimonial-prev',
          }" :autoplay="{
              delay: 5000,
              disableOnInteraction: false,
            }" :loop="true" class="testimonial-swiper">
            <SwiperSlide v-for="(testimonial, index) in testimonials" :key="index">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                <!-- Left Side - Testimonial Text -->
                <div class="order-2 lg:order-1">
                  <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8 lg:mb-12">
                    What our client says about our services.
                  </h3>

                  <div class="border-l-4 border-primary pl-6 mb-8">
                    <p class="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                      {{ testimonial.text }}
                    </p>

                    <!-- Quote Icon -->
                    <div class="text-primary text-4xl font-serif leading-none mb-4">"</div>
                  </div>

                  <!-- Navigation Arrows -->
                  <div class="flex gap-3">
                    <button
                      class="testimonial-prev w-12 h-12 rounded-lg bg-[#FCE9E5] text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                      aria-label="Previous testimonial">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      class="testimonial-next w-12 h-12 rounded-lg bg-[#FCE9E5] text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                      aria-label="Next testimonial">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Right Side - Image -->
                <div :class="['order-1 lg:order-2 rounded-2xl overflow-hidden aspect-4/3', !imageLoaded['testimonial'] && 'bg-gray-200 animate-pulse']">
                  <!-- Placeholder: Convert testimonial.svg manually at https://cloudconvert.com/svg-to-webp -->
                  <img src="@/assets/svg/testimonial.svg" :alt="testimonial.author"
                    class="w-full h-full object-cover" @load="handleImageLoad('testimonial')" />

                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="pricing-section py-8 sm:py-16 bg-[#FCE9E580]">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2
            class="text-xl md:text-3xl  xl:text-5xl font-bold text-gray-900 sm:leading-tight leading-normal mb-6 md:mb-8 font-campton!">
            Pricing and Membership Plans
          </h2>
          <p class="text-base md:text-lg text-gray-600 max-w-4xl mx-auto">
            At BNG Fitness Hub, we offer flexible time-based plans designed to fit your goals, schedule, and training
            style. Choose the option that aligns perfectly with your fitness journey.
          </p>
        </div>

        <!-- Pricing Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8  mx-auto">
          <!-- 24 Hours Plan -->
          <div class="bg-white rounded-3xl overflow-hidden shadow-sm" data-aos="fade-up" data-aos-delay="100">
            <!-- Gradient Header -->
            <div class="p-6 relative" style="background: linear-gradient(188.77deg, #E12700 -65.71%, #FFFFFF 27.74%);">
              <!-- Icon -->
              <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <!-- Badge -->
              <div class="absolute top-4 right-4 text-white text-xs px-3 py-1 rounded-full font-semibold" style="background: linear-gradient(90deg, #F3A999 0%, #E12700 100%);
">
                Most popular
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 pt-4">
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                24 Hours - Full Subscription
              </h3>
              <p class="text-sm text-gray-600 mb-6">
                Ideal for growing agencies or collaborative design teams who need scalable templates
              </p>

              <div class="mb-6">
                <div class="flex items-baseline gap-1">
                  <span class="text-4xl font-bold text-gray-900">₦10,000</span>
                  <span class="text-gray-600">/Month</span>
                </div>
              </div>

              <BngButton variant="primary" class="w-full mb-6">
                Get started now
              </BngButton>

              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">Full access to all classes & programs</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">Personalized welcome & advice</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">Progress tracking – advanced analytics</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">Membership perks & loyalty rewards</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">Unlimited gym access</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 4 Hours Plan -->
          <div class="bg-white rounded-3xl overflow-hidden shadow-sm" data-aos="fade-up" data-aos-delay="200">
            <!-- Gradient Header -->
            <div class="p-6 relative" style="background: linear-gradient(188.77deg, #E12700 -65.71%, #FFFFFF 27.74%);">
              <!-- Icon -->
              <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 pt-4">
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                4 Hours Subscription
              </h3>
              <p class="text-sm text-gray-600 mb-6">
                Idea for growing agencies or collaborative design teams who need scalable innovation
              </p>

              <div class="mb-6">
                <div class="flex items-baseline gap-1">
                  <span class="text-4xl font-bold text-gray-900">₦2,000</span>
                  <span class="text-gray-600">/Session</span>
                </div>
              </div>

              <BngButton variant="primary" class="w-full mb-6">
                Get started now
              </BngButton>

              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">Able to pay before session (flexible)</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">Full access to all equipment</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">Track session performance in the app</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">No contracts or recurring charges</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">Ideal for beginners or trial users</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Home Workout Plan -->
          <div class="bg-white rounded-3xl overflow-hidden shadow-sm" data-aos="fade-up" data-aos-delay="300">
            <!-- Gradient Header -->
            <div class="p-6 relative" style="background: linear-gradient(188.77deg, #E12700 -65.71%, #FFFFFF 27.74%);">
              <!-- Icon -->
              <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <!-- Badge -->
              <div style="background: linear-gradient(90deg, #F3A999 0%, #E12700 100%);"
                class="absolute top-4 right-4  text-white text-xs px-3 py-1 rounded-full font-semibold">
                Most popular
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 pt-4">
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Home Workout Subscription
              </h3>
              <p class="text-sm text-gray-600 mb-6">
                Ideal for growing agencies or collaborative design teams who need scalable templates
              </p>

              <div class="mb-6">
                <div class="flex items-baseline gap-1">
                  <span class="text-4xl font-bold text-gray-900">₦1,000</span>
                  <span class="text-gray-600">/Month</span>
                </div>
              </div>

              <BngButton variant="primary" class="w-full mb-6">
                Get started now
              </BngButton>

              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">Full access to all classes & programs</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">Personalized workout plans</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">Progress tracking – advanced analytics</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">Membership perks & loyalty rewards</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">Unlimited gym access</span>
                </li>
              </ul>
            </div>
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
            <div class="bg-primary rounded-3xl p-6 sm:p-8 flex justify-center items-center overflow-hidden h-[450px] sm:h-auto sm:max-h-[80vh]">
              <img src="@/assets/images/phone.webp" alt="bng phone" class="w-auto h-full max-h-[400px] sm:max-h-[70vh] max-w-full object-contain" loading="lazy">
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
/* Any additional custom styles if needed */
</style>