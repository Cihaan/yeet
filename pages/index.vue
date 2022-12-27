<template>
  <div class="home">
    <header>
      <h1>Welcome to Yeet !</h1>
      <p>
        You don't know what to eat for your next meal ? You're at the good place
        !
      </p>
      <p>Yeet gives you ideas by simply clicking a button, come on, try it.</p>

      <div class="yeet">
        <button @click="onYeetClick">Yeet</button>
      </div>
    </header>

    <div v-if="isLoading">
      <div class="loading">
        <div class="loading__spinner"></div>
      </div>
    </div>
    <section v-else-if="recipes.length > 0" class="recipe">
      <recipe-card :recipe="randomRecipe"></recipe-card>
    </section>
  </div>
</template>

<script setup lang="ts">
const recipes = ref([]);
const randomRecipe = ref({});
const isLoading = ref(false);
// const state = reactive({recipes: [
//     {
//       "nutrition_visibility": "auto",
//       "tags": [
//         {
//           "id": 65857,
//           "display_name": "Bakery Goods",
//           "type": "meal",
//           "name": "bakery_goods"
//         },
//         {
//           "name": "under_1_hour",
//           "id": 8091748,
//           "display_name": "Under 1 Hour",
//           "type": "difficulty"
//         },
//         {
//           "type": "difficulty",
//           "name": "5_ingredients_or_less",
//           "id": 64470,
//           "display_name": "5 Ingredients or Less"
//         },
//         {
//           "name": "christmas",
//           "id": 64473,
//           "display_name": "Christmas",
//           "type": "holiday"
//         },
//         {
//           "name": "desserts",
//           "id": 64485,
//           "display_name": "Desserts",
//           "type": "meal"
//         },
//         {
//           "name": "winter",
//           "id": 64511,
//           "display_name": "Winter",
//           "type": "seasonal"
//         },
//         {
//           "name": "casual_party",
//           "id": 64503,
//           "display_name": "Casual Party",
//           "type": "occasion"
//         },
//         {
//           "type": "occasion",
//           "name": "indulgent_sweets",
//           "id": 65850,
//           "display_name": "Indulgent Sweets"
//         },
//         {
//           "name": "under_30_minutes",
//           "id": 64472,
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty",
//           "name": "under_45_minutes",
//           "id": 8091747
//         }
//       ],
//       "updated_at": 1671659986,
//       "servings_noun_plural": "bites",
//       "seo_title": "",
//       "promotion": "full",
//       "seo_path": null,
//       "prep_time_minutes": null,
//       "brand_id": null,
//       "total_time_tier": {
//         "tier": "under_30_minutes",
//         "display_tier": "Under 30 minutes"
//       },
//       "country": "US",
//       "language": "eng",
//       "inspired_by_url": null,
//       "facebook_posts": [],
//       "brand": null,
//       "aspect_ratio": "9:16",
//       "description": "Who doesn't love a cute bite-size seasonal dessert?! Bake store-bought gingerbread cookie dough into cups, fill with cheesecake filling, and garnish with festive holiday sprinkles!",
//       "total_time_minutes": 30,
//       "renditions": [
//         {
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "width": 404,
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "file_size": 3376796,
//           "url": "https://vid.tasty.co/output/266817/square_720/1671225324",
//           "bit_rate": 1614,
//           "height": 720,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/266817/square_720/1671225324_00001.png",
//           "duration": 16742,
//           "minimum_bit_rate": null,
//           "name": "mp4_404x720"
//         },
//         {
//           "url": "https://vid.tasty.co/output/266817/square_320/1671225324",
//           "duration": 16742,
//           "aspect": "portrait",
//           "name": "mp4_180x320",
//           "maximum_bit_rate": null,
//           "height": 320,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/266817/square_320/1671225324_00001.png",
//           "file_size": 1220413,
//           "bit_rate": 584,
//           "content_type": "video/mp4",
//           "width": 180,
//           "minimum_bit_rate": null,
//           "container": "mp4"
//         },
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/266817/landscape_720/1671225324_00001.png",
//           "file_size": 3374736,
//           "url": "https://vid.tasty.co/output/266817/landscape_720/1671225324",
//           "duration": 16742,
//           "bit_rate": 1613,
//           "aspect": "portrait",
//           "width": 404,
//           "container": "mp4",
//           "height": 720,
//           "minimum_bit_rate": null,
//           "name": "mp4_404x720",
//           "maximum_bit_rate": null,
//           "content_type": "video/mp4"
//         },
//         {
//           "url": "https://vid.tasty.co/output/266817/landscape_480/1671225324",
//           "bit_rate": 947,
//           "content_type": "video/mp4",
//           "minimum_bit_rate": null,
//           "height": 480,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/266817/landscape_480/1671225324_00001.png",
//           "file_size": 1981548,
//           "duration": 16742,
//           "aspect": "portrait",
//           "width": 270,
//           "name": "mp4_270x480",
//           "maximum_bit_rate": null,
//           "container": "mp4"
//         },
//         {
//           "duration": 16771,
//           "aspect": "portrait",
//           "minimum_bit_rate": 267,
//           "name": "low",
//           "height": 1080,
//           "container": "ts",
//           "url": "https://vid.tasty.co/output/266817/hls24_1671225324.m3u8",
//           "bit_rate": null,
//           "content_type": "application/vnd.apple.mpegurl",
//           "width": 606,
//           "maximum_bit_rate": 2695,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/266817/1445289064805-h2exzu/1671225324_00001.png",
//           "file_size": null
//         }
//       ],
//       "instructions": [
//         {
//           "temperature": 350,
//           "id": 74125,
//           "position": 1,
//           "display_text": "Preheat the oven to 350°F (180°C). Grease a 24-cup mini muffin pan with nonstick spray.",
//           "start_time": 0,
//           "appliance": "oven",
//           "end_time": 0
//         },
//         {
//           "temperature": null,
//           "id": 74126,
//           "position": 2,
//           "display_text": "Portion the gingerbread cookie dough into 1½–2 tablespoons pieces, then add each piece into a mini muffin cup.",
//           "start_time": 1999,
//           "appliance": null,
//           "end_time": 3166
//         },
//         {
//           "position": 3,
//           "display_text": "Bake for 12–15 minutes, or until a toothpick inserted into the center of a cookie comes out clean.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 74127
//         },
//         {
//           "temperature": null,
//           "id": 74128,
//           "position": 4,
//           "display_text": "Meanwhile, make the cheesecake filling: In a medium bowl, use an electric hand mixer on medium speed to whip together the cream cheese, sour cream, vanilla, and powdered sugar until smooth. Transfer the filling to a piping bag and snip an opening in the tip.",
//           "start_time": 3666,
//           "appliance": null,
//           "end_time": 6500
//         },
//         {
//           "appliance": null,
//           "end_time": 13833,
//           "temperature": null,
//           "id": 74129,
//           "position": 5,
//           "display_text": "Use the bottom of a shot glass to press down firmly into the center of each gingerbread cookie to create a cup. Pipe the cheesecake filling into each cookie cup, then top with whipped cream and sprinkles.",
//           "start_time": 8000
//         },
//         {
//           "end_time": 0,
//           "temperature": null,
//           "id": 74130,
//           "position": 6,
//           "display_text": "Serve immediately, or chill in the refrigerator until ready to serve, up to 1 day.",
//           "start_time": 0,
//           "appliance": null
//         },
//         {
//           "position": 7,
//           "display_text": "Enjoy!",
//           "start_time": 14333,
//           "appliance": null,
//           "end_time": 16533,
//           "temperature": null,
//           "id": 74131
//         }
//       ],
//       "servings_noun_singular": "bite",
//       "sections": [
//         {
//           "components": [
//             {
//               "extra_comment": "for greasing",
//               "ingredient": {
//                 "created_at": 1520176895,
//                 "display_plural": "nonstick cooking sprays",
//                 "id": 3826,
//                 "display_singular": "nonstick cooking spray",
//                 "updated_at": 1520176895,
//                 "name": "nonstick cooking spray"
//               },
//               "id": 98312,
//               "position": 1,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": "",
//                     "display_plural": ""
//                   },
//                   "quantity": "0",
//                   "id": 719001
//                 }
//               ],
//               "raw_text": "Nonstick cooking spray, for greasing"
//             },
//             {
//               "position": 2,
//               "measurements": [
//                 {
//                   "id": 718996,
//                   "unit": {
//                     "abbreviation": "oz",
//                     "system": "imperial",
//                     "name": "ounce",
//                     "display_plural": "oz",
//                     "display_singular": "oz"
//                   },
//                   "quantity": "16"
//                 },
//                 {
//                   "unit": {
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g"
//                   },
//                   "quantity": "455",
//                   "id": 718994
//                 }
//               ],
//               "raw_text": "16 ounces pre-made gingerbread cookie dough",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 10640,
//                 "display_singular": "pre-made gingerbread cookie dough",
//                 "updated_at": 1671469496,
//                 "name": "pre-made gingerbread cookie dough",
//                 "created_at": 1671469496,
//                 "display_plural": "pre-made gingerbread cookie doughs"
//               },
//               "id": 98313
//             },
//             {
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "ounce",
//                     "display_plural": "oz",
//                     "display_singular": "oz",
//                     "abbreviation": "oz"
//                   },
//                   "quantity": "6",
//                   "id": 718999
//                 },
//                 {
//                   "unit": {
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric"
//                   },
//                   "quantity": "170",
//                   "id": 718997
//                 }
//               ],
//               "raw_text": "6 ounces softened cream cheese",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1596153748,
//                 "name": "softened cream cheese",
//                 "created_at": 1596153748,
//                 "display_plural": "softened cream cheeses",
//                 "id": 6692,
//                 "display_singular": "softened cream cheese"
//               },
//               "id": 98314,
//               "position": 3
//             },
//             {
//               "position": 4,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c",
//                     "system": "imperial",
//                     "name": "cup"
//                   },
//                   "quantity": "⅓",
//                   "id": 719000
//                 },
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "milliliter",
//                     "display_plural": "mL",
//                     "display_singular": "mL",
//                     "abbreviation": "mL"
//                   },
//                   "quantity": "80",
//                   "id": 718998
//                 }
//               ],
//               "raw_text": "⅓ cup sour cream",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_singular": "sour cream",
//                 "updated_at": 1509035256,
//                 "name": "sour cream",
//                 "created_at": 1495154479,
//                 "display_plural": "sour creams",
//                 "id": 496
//               },
//               "id": 98315
//             },
//             {
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "vanilla extract",
//                 "created_at": 1493745620,
//                 "display_plural": "vanilla extracts",
//                 "id": 103,
//                 "display_singular": "vanilla extract",
//                 "updated_at": 1509035284
//               },
//               "id": 98316,
//               "position": 5,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp",
//                     "system": "imperial",
//                     "name": "teaspoon"
//                   },
//                   "quantity": "1",
//                   "id": 719004
//                 }
//               ],
//               "raw_text": "1 teaspoon vanilla extract"
//             },
//             {
//               "raw_text": "1 cup powdered sugar",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035283,
//                 "name": "powdered sugar",
//                 "created_at": 1493747135,
//                 "display_plural": "powdered sugars",
//                 "id": 144,
//                 "display_singular": "powdered sugar"
//               },
//               "id": 98317,
//               "position": 6,
//               "measurements": [
//                 {
//                   "quantity": "1",
//                   "id": 718995,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   }
//                 },
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "110",
//                   "id": 718993
//                 }
//               ]
//             },
//             {
//               "extra_comment": "for garnish",
//               "ingredient": {
//                 "updated_at": 1509035253,
//                 "name": "whipped cream",
//                 "created_at": 1495218157,
//                 "display_plural": "whipped creams",
//                 "id": 528,
//                 "display_singular": "whipped cream"
//               },
//               "id": 98318,
//               "position": 7,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": "",
//                     "display_plural": ""
//                   },
//                   "quantity": "0",
//                   "id": 719002
//                 }
//               ],
//               "raw_text": "Whipped cream, for garnish"
//             },
//             {
//               "raw_text": "Holiday sprinkles, for garnish",
//               "extra_comment": "for garnish",
//               "ingredient": {
//                 "updated_at": 1636112089,
//                 "name": "holiday sprinkles",
//                 "created_at": 1636112089,
//                 "display_plural": "holiday sprinkles",
//                 "id": 9278,
//                 "display_singular": "holiday sprinkle"
//               },
//               "id": 98319,
//               "position": 8,
//               "measurements": [
//                 {
//                   "id": 719003,
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "0"
//                 }
//               ]
//             }
//           ],
//           "name": null,
//           "position": 1
//         }
//       ],
//       "thumbnail_url": "https://s3.amazonaws.com/video-api-prod/assets/2112cfcb12ff437daf48bcd6339b3921/6749817B-B066-46F6-AAA0-468D76B7B490_1_201_a.jpeg",
//       "video_url": "https://vid.tasty.co/output/266817/hls24_1671225324.m3u8",
//       "topics": [
//         {
//           "name": "5 Ingredients or Less",
//           "slug": "5-ingredients-or-less"
//         },
//         {
//           "slug": "baked-goods",
//           "name": "Baked Goods"
//         },
//         {
//           "name": "Christmas",
//           "slug": "christmas"
//         },
//         {
//           "name": "Christmas Cookies",
//           "slug": "christmas-cookies"
//         },
//         {
//           "name": "Holiday Party",
//           "slug": "holiday-party"
//         },
//         {
//           "name": "Winter Recipes",
//           "slug": "winter"
//         },
//         {
//           "name": "Desserts",
//           "slug": "desserts"
//         }
//       ],
//       "is_shoppable": true,
//       "video_ad_content": "none",
//       "keywords": "",
//       "price": {
//         "portion": 50,
//         "consumption_total": 800,
//         "consumption_portion": 50,
//         "total": 1450,
//         "updated_at": "2022-12-24T06:31:03+01:00"
//       },
//       "compilations": [],
//       "buzz_id": null,
//       "tips_and_ratings_enabled": true,
//       "thumbnail_alt_text": "",
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/b7b09fb46e25423e8676f0ed8b71e540/gingerbreadcheesecakebites.mp4",
//       "cook_time_minutes": null,
//       "yields": "Makes 24 bites",
//       "canonical_id": "recipe:8582",
//       "slug": "mini-gingerbread-cheesecake-bites",
//       "nutrition": {},
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "created_at": 1671225404,
//       "approved_at": 1671501125,
//       "is_one_top": false,
//       "credits": [
//         {
//           "name": "Bella Lopez",
//           "type": "internal"
//         }
//       ],
//       "beauty_url": null,
//       "user_ratings": {
//         "count_positive": 2,
//         "score": 0.666667,
//         "count_negative": 1
//       },
//       "id": 8582,
//       "show_id": 17,
//       "name": "Mini Gingerbread Cheesecake Bites",
//       "num_servings": 24,
//       "draft_status": "published",
//       "video_id": 175276
//     },
//     {
//       "name": "Chipotle Apricot Cream Cheese Bites",
//       "aspect_ratio": "9:16",
//       "seo_title": "Cream Cheese Bites",
//       "video_id": 176187,
//       "tags": [
//         {
//           "type": "difficulty",
//           "name": "under_15_minutes",
//           "id": 8091744,
//           "display_name": "Under 15 Minutes"
//         },
//         {
//           "name": "easy",
//           "id": 64471,
//           "display_name": "Easy",
//           "type": "difficulty"
//         },
//         {
//           "name": "appetizers",
//           "id": 64481,
//           "display_name": "Appetizers",
//           "type": "meal"
//         },
//         {
//           "name": "snacks",
//           "id": 64491,
//           "display_name": "Snacks",
//           "type": "meal"
//         },
//         {
//           "name": "vegetarian",
//           "id": 64469,
//           "display_name": "Vegetarian",
//           "type": "dietary"
//         },
//         {
//           "name": "thanksgiving",
//           "id": 64479,
//           "display_name": "Thanksgiving",
//           "type": "holiday"
//         },
//         {
//           "type": "holiday",
//           "name": "christmas",
//           "id": 64473,
//           "display_name": "Christmas"
//         },
//         {
//           "name": "casual_party",
//           "id": 64503,
//           "display_name": "Casual Party",
//           "type": "occasion"
//         },
//         {
//           "id": 64502,
//           "display_name": "Happy Hour",
//           "type": "occasion",
//           "name": "happy_hour"
//         },
//         {
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty",
//           "name": "under_30_minutes",
//           "id": 64472
//         },
//         {
//           "name": "under_45_minutes",
//           "id": 8091747,
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "type": "difficulty",
//           "name": "under_1_hour",
//           "id": 8091748,
//           "display_name": "Under 1 Hour"
//         }
//       ],
//       "user_ratings": {
//         "score": 1,
//         "count_negative": 0,
//         "count_positive": 4
//       },
//       "total_time_tier": {
//         "tier": "under_15_minutes",
//         "display_tier": "Under 15 minutes"
//       },
//       "language": "eng",
//       "buzz_id": null,
//       "video_url": "https://vid.tasty.co/output/265716/hls24_1670605629.m3u8",
//       "is_one_top": false,
//       "is_shoppable": true,
//       "yields": "Servings: 14",
//       "canonical_id": "recipe:8575",
//       "brand_id": null,
//       "show_id": 17,
//       "compilations": [],
//       "num_servings": 14,
//       "description": "If you need a last minute appetizer for your next holiday party, look no further–these sweet and spicy apricot chipotle cream cheese bites can be made in under 15 minutes.",
//       "total_time_minutes": 15,
//       "promotion": "full",
//       "country": "US",
//       "brand": null,
//       "prep_time_minutes": 15,
//       "created_at": 1670605711,
//       "thumbnail_alt_text": "",
//       "approved_at": 1670614547,
//       "instructions": [
//         {
//           "end_time": 4016,
//           "temperature": null,
//           "id": 74078,
//           "position": 1,
//           "display_text": "Arrange the crackers in a single layer on a serving platter.",
//           "start_time": 2683,
//           "appliance": null
//         },
//         {
//           "position": 2,
//           "display_text": "Cut the cream cheese into 14 pieces, then roll each piece into a ball.",
//           "start_time": 4516,
//           "appliance": null,
//           "end_time": 6716,
//           "temperature": null,
//           "id": 74079
//         },
//         {
//           "end_time": 11916,
//           "temperature": null,
//           "id": 74080,
//           "position": 3,
//           "display_text": "Add the pecan pieces to a shallow bowl, then roll the cream cheese balls in the pecans to cover completely, pressing the nuts into the cream cheese. Place each ball on top of a cracker.",
//           "start_time": 7383,
//           "appliance": null
//         },
//         {
//           "start_time": 12583,
//           "appliance": null,
//           "end_time": 16283,
//           "temperature": null,
//           "id": 74081,
//           "position": 4,
//           "display_text": "In a small bowl, add the apricot jam. Finely chop the chipotle peppers, then add to the jam and stir to incorporate."
//         },
//         {
//           "temperature": null,
//           "id": 74082,
//           "position": 5,
//           "display_text": "Spoon the chipotle-apricot jelly on top of each cream cheese ball. If desired, garnish with a few rosemary leaves.",
//           "start_time": 17950,
//           "appliance": null,
//           "end_time": 21316
//         },
//         {
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 74083,
//           "position": 6,
//           "display_text": "Serve immediately.",
//           "start_time": 0
//         },
//         {
//           "id": 74084,
//           "position": 7,
//           "display_text": "Enjoy!",
//           "start_time": 333,
//           "appliance": null,
//           "end_time": 1833,
//           "temperature": null
//         }
//       ],
//       "price": {
//         "total": 2250,
//         "updated_at": "2022-12-24T06:31:01+01:00",
//         "portion": 150,
//         "consumption_total": 1100,
//         "consumption_portion": 100
//       },
//       "tips_and_ratings_enabled": true,
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "inspired_by_url": null,
//       "updated_at": 1670614547,
//       "servings_noun_plural": "servings",
//       "beauty_url": null,
//       "nutrition_visibility": "auto",
//       "cook_time_minutes": 0,
//       "topics": [
//         {
//           "name": "Best Vegetarian",
//           "slug": "best-vegetarian"
//         },
//         {
//           "name": "Christmas",
//           "slug": "christmas"
//         },
//         {
//           "name": "New Years Party",
//           "slug": "new-years"
//         },
//         {
//           "name": "Thanksgiving",
//           "slug": "thanksgiving"
//         },
//         {
//           "name": "Snacks",
//           "slug": "snacks"
//         }
//       ],
//       "slug": "chipotle-apricot-cream-cheese-bites",
//       "servings_noun_singular": "serving",
//       "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/416054.jpg",
//       "video_ad_content": "none",
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/60184bdde3fd47c5a766df84162707b9/BFV98512_HolidayPartySnack_9x16.mp4",
//       "id": 8575,
//       "facebook_posts": [],
//       "sections": [
//         {
//           "components": [
//             {
//               "id": 98252,
//               "position": 1,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "14",
//                   "id": 718124
//                 }
//               ],
//               "raw_text": "14 round butter crackers",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_singular": "round butter cracker",
//                 "updated_at": 1603492254,
//                 "name": "round butter crackers",
//                 "created_at": 1603492254,
//                 "display_plural": "round butter crackers",
//                 "id": 7329
//               }
//             },
//             {
//               "id": 98253,
//               "position": 2,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "ounce",
//                     "display_plural": "oz",
//                     "display_singular": "oz",
//                     "abbreviation": "oz"
//                   },
//                   "quantity": "8",
//                   "id": 718123
//                 },
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "225",
//                   "id": 718122
//                 }
//               ],
//               "raw_text": "8 ounces cream cheese",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035276,
//                 "name": "cream cheese",
//                 "created_at": 1494297000,
//                 "display_plural": "cream cheeses",
//                 "id": 242,
//                 "display_singular": "cream cheese"
//               }
//             },
//             {
//               "raw_text": "½ cup pecan pieces",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 5929,
//                 "display_singular": "pecan piece",
//                 "updated_at": 1574095494,
//                 "name": "pecan pieces",
//                 "created_at": 1574095494,
//                 "display_plural": "pecan pieces"
//               },
//               "id": 98254,
//               "position": 3,
//               "measurements": [
//                 {
//                   "quantity": "½",
//                   "id": 718121,
//                   "unit": {
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c",
//                     "system": "imperial",
//                     "name": "cup"
//                   }
//                 },
//                 {
//                   "quantity": "60",
//                   "id": 718120,
//                   "unit": {
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric"
//                   }
//                 }
//               ]
//             },
//             {
//               "id": 98255,
//               "position": 4,
//               "measurements": [
//                 {
//                   "id": 718127,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   },
//                   "quantity": "½"
//                 },
//                 {
//                   "unit": {
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric",
//                     "name": "gram"
//                   },
//                   "quantity": "150",
//                   "id": 718126
//                 }
//               ],
//               "raw_text": "½ cup apricot jam",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_plural": "apricot jams",
//                 "id": 3643,
//                 "display_singular": "apricot jam",
//                 "updated_at": 1517962149,
//                 "name": "apricot jam",
//                 "created_at": 1517962149
//               }
//             },
//             {
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "1",
//                   "id": 718125
//                 }
//               ],
//               "raw_text": "1–2 chipotle peppers in adobo",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_plural": "chipotle peppers in adobo",
//                 "id": 1505,
//                 "display_singular": "chipotle pepper in adobo",
//                 "updated_at": 1509035184,
//                 "name": "chipotle peppers in adobo",
//                 "created_at": 1496791288
//               },
//               "id": 98256,
//               "position": 5
//             },
//             {
//               "position": 6,
//               "measurements": [
//                 {
//                   "quantity": "0",
//                   "id": 718128,
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   }
//                 }
//               ],
//               "raw_text": "Fresh rosemary or thyme leaves, for garnish (optional)",
//               "extra_comment": "or thyme leaves, for garnish",
//               "ingredient": {
//                 "name": "fresh rosemary",
//                 "created_at": 1495134627,
//                 "display_plural": "fresh rosemaries",
//                 "id": 476,
//                 "display_singular": "fresh rosemary",
//                 "updated_at": 1509035257
//               },
//               "id": 98257
//             }
//           ],
//           "name": null,
//           "position": 1
//         }
//       ],
//       "nutrition": {
//         "calories": 80,
//         "sugar": 3,
//         "carbohydrates": 7,
//         "fiber": 0,
//         "updated_at": "2022-12-11T07:01:27+01:00",
//         "protein": 1,
//         "fat": 5
//       },
//       "draft_status": "published",
//       "credits": [
//         {
//           "name": "Ivanna Lopez Guajardo",
//           "type": "internal"
//         }
//       ],
//       "renditions": [
//         {
//           "name": "mp4_404x720",
//           "container": "mp4",
//           "file_size": 4469821,
//           "url": "https://vid.tasty.co/output/265716/square_720/1670605629",
//           "duration": 23649,
//           "aspect": "portrait",
//           "width": 404,
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/265716/square_720/1670605629_00001.png",
//           "bit_rate": 1513,
//           "content_type": "video/mp4",
//           "height": 720
//         },
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/265716/square_320/1670605629_00001.png",
//           "duration": 23649,
//           "aspect": "portrait",
//           "width": 180,
//           "maximum_bit_rate": null,
//           "height": 320,
//           "name": "mp4_180x320",
//           "container": "mp4",
//           "file_size": 1638400,
//           "url": "https://vid.tasty.co/output/265716/square_320/1670605629",
//           "bit_rate": 555,
//           "content_type": "video/mp4",
//           "minimum_bit_rate": null
//         },
//         {
//           "bit_rate": 1512,
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/265716/landscape_720/1670605629_00001.png",
//           "file_size": 4467048,
//           "url": "https://vid.tasty.co/output/265716/landscape_720/1670605629",
//           "duration": 23649,
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "width": 404,
//           "name": "mp4_404x720",
//           "height": 720
//         },
//         {
//           "file_size": 2608179,
//           "url": "https://vid.tasty.co/output/265716/landscape_480/1670605629",
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "height": 480,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/265716/landscape_480/1670605629_00001.png",
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "width": 270,
//           "name": "mp4_270x480",
//           "duration": 23649,
//           "bit_rate": 883
//         },
//         {
//           "name": "low",
//           "height": 1080,
//           "file_size": null,
//           "url": "https://vid.tasty.co/output/265716/hls24_1670605629.m3u8",
//           "content_type": "application/vnd.apple.mpegurl",
//           "minimum_bit_rate": 268,
//           "aspect": "portrait",
//           "width": 608,
//           "maximum_bit_rate": 2545,
//           "container": "ts",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/265716/1445289064805-h2exzu/1670605629_00001.png",
//           "duration": 23691,
//           "bit_rate": null
//         }
//       ],
//       "keywords": ""
//     },
//     {
//       "instructions": [
//         {
//           "start_time": 3000,
//           "appliance": null,
//           "end_time": 3666,
//           "temperature": null,
//           "id": 74039,
//           "position": 1,
//           "display_text": "Halve the hard-boiled eggs lengthwise, separate the yolks from the whites, and add the yolks to a large bowl. Reserve the whites."
//         },
//         {
//           "display_text": "Add the mayonnaise, Dijon mustard, shallot, green onion, dill, capers, and McCormick® Flavor of the Year seasoning to the egg yolks and mix until smooth and evenly combined.",
//           "start_time": 4166,
//           "appliance": null,
//           "end_time": 15549,
//           "temperature": null,
//           "id": 74040,
//           "position": 2
//         },
//         {
//           "position": 3,
//           "display_text": "Chop the egg whites, then add to the egg yolk mixture and fold to incorporate.",
//           "start_time": 15550,
//           "appliance": null,
//           "end_time": 18433,
//           "temperature": null,
//           "id": 74041
//         },
//         {
//           "appliance": null,
//           "end_time": 21166,
//           "temperature": null,
//           "id": 74042,
//           "position": 4,
//           "display_text": "To assemble the sandwiches, add one slice each of American and cheddar cheese to one slice of bread. Top with 3–4 tablespoons of the egg salad, spreading evenly. Top with another slice each of American and cheddar cheese and another slice of bread. Repeat with the remaining ingredients to make a total of 5 sandwiches.",
//           "start_time": 19000
//         },
//         {
//           "display_text": "Melt a knob of butter in a medium pan over medium-low heat. Add the sandwiches, working in batches as needed, and cook for 2–3 minutes, then flip and cook for another 2–3 minutes on the other side, until the bread is golden brown and the cheese is melted. Serve immediately.",
//           "start_time": 22000,
//           "appliance": null,
//           "end_time": 23083,
//           "temperature": null,
//           "id": 74043,
//           "position": 5
//         },
//         {
//           "temperature": null,
//           "id": 74044,
//           "position": 6,
//           "display_text": "Enjoy!",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 2500
//         }
//       ],
//       "total_time_minutes": 30,
//       "video_url": "https://vid.tasty.co/output/265308/hls24_1670356103.m3u8",
//       "yields": "Servings: 5",
//       "promotion": "full",
//       "slug": "egg-salad-grilled-cheese-sandwich-featuring-mccormick-r-s-flavor-of-the-year",
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "draft_status": "published",
//       "canonical_id": "recipe:8571",
//       "nutrition_visibility": "auto",
//       "servings_noun_singular": "serving",
//       "inspired_by_url": null,
//       "is_one_top": false,
//       "total_time_tier": {
//         "tier": "under_30_minutes",
//         "display_tier": "Under 30 minutes"
//       },
//       "video_ad_content": "none",
//       "language": "eng",
//       "name": "Egg Salad Grilled Cheese Sandwich Featuring Mccormick®’s Flavor Of The Year",
//       "created_at": 1670356219,
//       "credits": [
//         {
//           "name": "Ivanna Lopez Guajardo",
//           "type": "internal"
//         }
//       ],
//       "servings_noun_plural": "servings",
//       "seo_title": "Egg Salad Sandwich",
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/8c980c6fd97c4415adc2cc87c38f8fa2/BFV98399_EggSaladGrilledCheeseSandwichFtMccormickFlavorOfTheYear_16x9_1.mp4",
//       "cook_time_minutes": 10,
//       "keywords": "",
//       "tags": [
//         {
//           "type": "difficulty",
//           "name": "under_30_minutes",
//           "id": 64472,
//           "display_name": "Under 30 Minutes"
//         },
//         {
//           "display_name": "Lunch",
//           "type": "meal",
//           "name": "lunch",
//           "id": 64489
//         },
//         {
//           "name": "easy",
//           "id": 64471,
//           "display_name": "Easy",
//           "type": "difficulty"
//         },
//         {
//           "name": "vegetarian",
//           "id": 64469,
//           "display_name": "Vegetarian",
//           "type": "dietary"
//         },
//         {
//           "name": "american",
//           "id": 64444,
//           "display_name": "American",
//           "type": "cuisine"
//         },
//         {
//           "display_name": "Comfort Food",
//           "type": "cooking_style",
//           "name": "comfort_food",
//           "id": 64462
//         },
//         {
//           "id": 65852,
//           "display_name": "Mashup",
//           "type": "cooking_style",
//           "name": "mashup"
//         },
//         {
//           "name": "stove_top",
//           "id": 65848,
//           "display_name": "Stove Top",
//           "type": "appliance"
//         },
//         {
//           "type": "difficulty",
//           "name": "under_45_minutes",
//           "id": 8091747,
//           "display_name": "Under 45 Minutes"
//         },
//         {
//           "display_name": "Under 1 Hour",
//           "type": "difficulty",
//           "name": "under_1_hour",
//           "id": 8091748
//         }
//       ],
//       "nutrition": {},
//       "tips_and_ratings_enabled": true,
//       "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/415470.jpg",
//       "video_id": 175913,
//       "updated_at": 1670433094,
//       "approved_at": 1670433094,
//       "facebook_posts": [],
//       "price": {
//         "total": 7450,
//         "updated_at": "2022-12-24T06:31:00+01:00",
//         "portion": 1500,
//         "consumption_total": 5800,
//         "consumption_portion": 1150
//       },
//       "id": 8571,
//       "brand_id": null,
//       "compilations": [],
//       "num_servings": 5,
//       "thumbnail_alt_text": "",
//       "beauty_url": null,
//       "country": "US",
//       "user_ratings": {
//         "count_positive": 4,
//         "score": 0.8,
//         "count_negative": 1
//       },
//       "brand": null,
//       "show_id": 17,
//       "sections": [
//         {
//           "position": 1,
//           "components": [
//             {
//               "position": 1,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "12",
//                   "id": 717595
//                 }
//               ],
//               "raw_text": "12 hard-boiled eggs",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_singular": "hard-boiled egg",
//                 "updated_at": 1509035252,
//                 "name": "hard-boiled egg",
//                 "created_at": 1495299407,
//                 "display_plural": "hard-boiled eggs",
//                 "id": 554
//               },
//               "id": 98183
//             },
//             {
//               "ingredient": {
//                 "updated_at": 1509035249,
//                 "name": "mayonnaise",
//                 "created_at": 1495392174,
//                 "display_plural": "mayonnaises",
//                 "id": 583,
//                 "display_singular": "mayonnaise"
//               },
//               "id": 98184,
//               "position": 2,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c",
//                     "system": "imperial",
//                     "name": "cup"
//                   },
//                   "quantity": "⅓",
//                   "id": 717597
//                 },
//                 {
//                   "id": 717596,
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "80"
//                 }
//               ],
//               "raw_text": "⅓ cup mayonnaise",
//               "extra_comment": ""
//             },
//             {
//               "id": 98185,
//               "position": 3,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   },
//                   "quantity": "1",
//                   "id": 717603
//                 }
//               ],
//               "raw_text": "1 teaspoon Dijon mustard",
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "dijon mustard",
//                 "created_at": 1494812213,
//                 "display_plural": "dijon mustards",
//                 "id": 307,
//                 "display_singular": "dijon mustard",
//                 "updated_at": 1509035271
//               }
//             },
//             {
//               "position": 4,
//               "measurements": [
//                 {
//                   "unit": {
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none"
//                   },
//                   "quantity": "1",
//                   "id": 717600
//                 }
//               ],
//               "raw_text": "1 shallot, minced",
//               "extra_comment": "minced",
//               "ingredient": {
//                 "id": 2753,
//                 "display_singular": "shallot",
//                 "updated_at": 1509035111,
//                 "name": "shallot",
//                 "created_at": 1501605439,
//                 "display_plural": "shallots"
//               },
//               "id": 98186
//             },
//             {
//               "id": 98187,
//               "position": 5,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "1",
//                   "id": 717601
//                 }
//               ],
//               "raw_text": "1 green onion, sliced, green parts only",
//               "extra_comment": "sliced, green parts only",
//               "ingredient": {
//                 "id": 255,
//                 "display_singular": "green onion",
//                 "updated_at": 1509035275,
//                 "name": "green onion",
//                 "created_at": 1494382484,
//                 "display_plural": "green onions"
//               }
//             },
//             {
//               "extra_comment": "fonds chopped",
//               "ingredient": {
//                 "created_at": 1496023612,
//                 "display_plural": "fresh dills",
//                 "id": 921,
//                 "display_singular": "fresh dill",
//                 "updated_at": 1509035222,
//                 "name": "fresh dill"
//               },
//               "id": 98188,
//               "position": 6,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_singular": "sprig",
//                     "abbreviation": "sprig",
//                     "system": "none",
//                     "name": "sprig",
//                     "display_plural": "sprigs"
//                   },
//                   "quantity": "1",
//                   "id": 717598
//                 }
//               ],
//               "raw_text": "1 sprig of fresh dill, fronds chopped"
//             },
//             {
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1625929826,
//                 "name": "capers",
//                 "created_at": 1625929826,
//                 "display_plural": "capers",
//                 "id": 8774,
//                 "display_singular": "caper"
//               },
//               "id": 98189,
//               "position": 7,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   },
//                   "quantity": "2",
//                   "id": 717607
//                 }
//               ],
//               "raw_text": "2 teaspoons capers"
//             },
//             {
//               "ingredient": {
//                 "display_plural": "Mccormick® flavors of the year: vietnamese x cajun style",
//                 "id": 10575,
//                 "display_singular": "Mccormick® flavor of the year: vietnamese x cajun style",
//                 "updated_at": 1670417174,
//                 "name": "McCormick® Flavor of the Year: Vietnamese x Cajun Style",
//                 "created_at": 1670417174
//               },
//               "id": 98190,
//               "position": 8,
//               "measurements": [
//                 {
//                   "id": 717606,
//                   "unit": {
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp",
//                     "system": "imperial"
//                   },
//                   "quantity": "1"
//                 }
//               ],
//               "raw_text": "1 teaspoon McCormick® Flavor of the Year: Vietnamese x Cajun Style",
//               "extra_comment": ""
//             },
//             {
//               "position": 9,
//               "measurements": [
//                 {
//                   "quantity": "10",
//                   "id": 717599,
//                   "unit": {
//                     "system": "none",
//                     "name": "slice",
//                     "display_plural": "slices",
//                     "display_singular": "slice",
//                     "abbreviation": "slice"
//                   }
//                 }
//               ],
//               "raw_text": "10 slices whole wheat bread",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035277,
//                 "name": "whole wheat bread",
//                 "created_at": 1494295092,
//                 "display_plural": "whole wheat breads",
//                 "id": 235,
//                 "display_singular": "whole wheat bread"
//               },
//               "id": 98191
//             },
//             {
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "slice",
//                     "system": "none",
//                     "name": "slice",
//                     "display_plural": "slices",
//                     "display_singular": "slice"
//                   },
//                   "quantity": "10",
//                   "id": 717604
//                 }
//               ],
//               "raw_text": "10 slices American cheese",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035240,
//                 "name": "american cheese",
//                 "created_at": 1495665885,
//                 "display_plural": "american cheeses",
//                 "id": 697,
//                 "display_singular": "american cheese"
//               },
//               "id": 98192,
//               "position": 10
//             },
//             {
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "slices",
//                     "display_singular": "slice",
//                     "abbreviation": "slice",
//                     "system": "none",
//                     "name": "slice"
//                   },
//                   "quantity": "10",
//                   "id": 717605
//                 }
//               ],
//               "raw_text": "10 slices cheddar cheese",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035261,
//                 "name": "cheddar cheese",
//                 "created_at": 1495068854,
//                 "display_plural": "cheddar cheeses",
//                 "id": 434,
//                 "display_singular": "cheddar cheese"
//               },
//               "id": 98193,
//               "position": 11
//             },
//             {
//               "position": 12,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": ""
//                   },
//                   "quantity": "0",
//                   "id": 717602
//                 }
//               ],
//               "raw_text": "Unsalted butter, as needed",
//               "extra_comment": "as needed",
//               "ingredient": {
//                 "id": 291,
//                 "display_singular": "unsalted butter",
//                 "updated_at": 1509035272,
//                 "name": "unsalted butter",
//                 "created_at": 1494806355,
//                 "display_plural": "unsalted butters"
//               },
//               "id": 98194
//             }
//           ],
//           "name": null
//         }
//       ],
//       "is_shoppable": true,
//       "topics": [
//         {
//           "name": "Best Vegetarian",
//           "slug": "best-vegetarian"
//         },
//         {
//           "name": "Bread Lovers",
//           "slug": "bread"
//         },
//         {
//           "name": "Lunch",
//           "slug": "lunch"
//         },
//         {
//           "name": "American",
//           "slug": "american"
//         }
//       ],
//       "prep_time_minutes": 20,
//       "buzz_id": null,
//       "aspect_ratio": "9:16",
//       "description": "McCormick® just released their 2023 Flavor of the Year: Vietnamese x Cajun Style. You can pair these amazing flavors with hundreds of savory and sweet dishes, like this egg salad grilled cheese with a flavor kick!",
//       "renditions": [
//         {
//           "maximum_bit_rate": null,
//           "height": 720,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/265308/square_720/1670356103_00001.png",
//           "file_size": 6188021,
//           "duration": 23816,
//           "bit_rate": 2079,
//           "name": "mp4_404x720",
//           "minimum_bit_rate": null,
//           "container": "mp4",
//           "url": "https://vid.tasty.co/output/265308/square_720/1670356103",
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "width": 404
//         },
//         {
//           "file_size": 2079874,
//           "url": "https://vid.tasty.co/output/265308/square_320/1670356103",
//           "width": 180,
//           "minimum_bit_rate": null,
//           "name": "mp4_180x320",
//           "maximum_bit_rate": null,
//           "height": 320,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/265308/square_320/1670356103_00001.png",
//           "duration": 23816,
//           "bit_rate": 699,
//           "content_type": "video/mp4",
//           "aspect": "portrait"
//         },
//         {
//           "file_size": 6186256,
//           "url": "https://vid.tasty.co/output/265308/landscape_720/1670356103",
//           "duration": 23816,
//           "width": 404,
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "bit_rate": 2079,
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "name": "mp4_404x720",
//           "height": 720,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/265308/landscape_720/1670356103_00001.png"
//         },
//         {
//           "width": 270,
//           "name": "mp4_270x480",
//           "maximum_bit_rate": null,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/265308/landscape_480/1670356103_00001.png",
//           "duration": 23816,
//           "bit_rate": 1187,
//           "content_type": "video/mp4",
//           "minimum_bit_rate": null,
//           "height": 480,
//           "container": "mp4",
//           "file_size": 3531268,
//           "url": "https://vid.tasty.co/output/265308/landscape_480/1670356103",
//           "aspect": "portrait"
//         },
//         {
//           "aspect": "portrait",
//           "minimum_bit_rate": 275,
//           "name": "low",
//           "maximum_bit_rate": 3282,
//           "height": 1080,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/265308/1445289064805-h2exzu/1670356103_00001.png",
//           "file_size": null,
//           "duration": 23858,
//           "bit_rate": null,
//           "content_type": "application/vnd.apple.mpegurl",
//           "width": 608,
//           "container": "ts",
//           "url": "https://vid.tasty.co/output/265308/hls24_1670356103.m3u8"
//         }
//       ]
//     },
//     {
//       "tips_and_ratings_enabled": true,
//       "credits": [
//         {
//           "name": "Ivanna Lopez Guajardo",
//           "type": "internal"
//         }
//       ],
//       "country": "US",
//       "facebook_posts": [],
//       "id": 8556,
//       "show_id": 17,
//       "sections": [
//         {
//           "components": [
//             {
//               "ingredient": {
//                 "updated_at": 1509035280,
//                 "name": "water",
//                 "created_at": 1494124627,
//                 "display_plural": "waters",
//                 "id": 197,
//                 "display_singular": "water"
//               },
//               "id": 98004,
//               "position": 1,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   },
//                   "quantity": "6",
//                   "id": 716720
//                 },
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "liter",
//                     "display_plural": "L",
//                     "display_singular": "L",
//                     "abbreviation": "L"
//                   },
//                   "quantity": "1.4",
//                   "id": 716719
//                 }
//               ],
//               "raw_text": "6 cups water",
//               "extra_comment": ""
//             },
//             {
//               "raw_text": "½ cup coffee grounds",
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "coffee grounds",
//                 "created_at": 1588118068,
//                 "display_plural": "coffee grounds",
//                 "id": 6411,
//                 "display_singular": "coffee ground",
//                 "updated_at": 1588118068
//               },
//               "id": 98005,
//               "position": 2,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "c",
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup"
//                   },
//                   "quantity": "½",
//                   "id": 716715
//                 },
//                 {
//                   "unit": {
//                     "abbreviation": "g",
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g"
//                   },
//                   "quantity": "60",
//                   "id": 716713
//                 }
//               ]
//             },
//             {
//               "raw_text": "1 piloncillo (120 grams)",
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "piloncillo",
//                 "created_at": 1545845406,
//                 "display_plural": "piloncilloes",
//                 "id": 5013,
//                 "display_singular": "piloncillo",
//                 "updated_at": 1545845406
//               },
//               "id": 98006,
//               "position": 3,
//               "measurements": [
//                 {
//                   "id": 716717,
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "1"
//                 },
//                 {
//                   "unit": {
//                     "abbreviation": "g",
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g"
//                   },
//                   "quantity": "120",
//                   "id": 716716
//                 }
//               ]
//             },
//             {
//               "raw_text": "2 whole cinnamon sticks",
//               "extra_comment": "",
//               "ingredient": {
//                 "created_at": 1583952731,
//                 "display_plural": "whole cinnamon sticks",
//                 "id": 6291,
//                 "display_singular": "whole cinnamon stick",
//                 "updated_at": 1583952731,
//                 "name": "whole cinnamon sticks"
//               },
//               "id": 98007,
//               "position": 4,
//               "measurements": [
//                 {
//                   "quantity": "2",
//                   "id": 716718,
//                   "unit": {
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": ""
//                   }
//                 }
//               ]
//             },
//             {
//               "raw_text": "2–3 whole star anise pods",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 10552,
//                 "display_singular": "whole star anise pod",
//                 "updated_at": 1670259896,
//                 "name": "whole star anise pods",
//                 "created_at": 1670259896,
//                 "display_plural": "whole star anise pods"
//               },
//               "id": 98008,
//               "position": 5,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "2",
//                   "id": 716714
//                 }
//               ]
//             },
//             {
//               "ingredient": {
//                 "display_singular": "whole clove",
//                 "updated_at": 1670259892,
//                 "name": "whole cloves",
//                 "created_at": 1670259892,
//                 "display_plural": "whole cloves",
//                 "id": 10551
//               },
//               "id": 98009,
//               "position": 6,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": "",
//                     "display_plural": ""
//                   },
//                   "quantity": "5",
//                   "id": 716712
//                 }
//               ],
//               "raw_text": "5 whole cloves",
//               "extra_comment": ""
//             }
//           ],
//           "name": null,
//           "position": 1
//         }
//       ],
//       "aspect_ratio": "9:16",
//       "total_time_minutes": 15,
//       "video_url": "https://vid.tasty.co/output/264481/hls24_1669920137.m3u8",
//       "user_ratings": {
//         "count_positive": 5,
//         "score": 0.833333,
//         "count_negative": 1
//       },
//       "slug": "cafecito-de-olla",
//       "tags": [
//         {
//           "name": "easy",
//           "id": 64471,
//           "display_name": "Easy",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_15_minutes",
//           "id": 8091744,
//           "display_name": "Under 15 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "5_ingredients_or_less",
//           "id": 64470,
//           "display_name": "5 Ingredients or Less",
//           "type": "difficulty"
//         },
//         {
//           "type": "appliance",
//           "name": "stove_top",
//           "id": 65848,
//           "display_name": "Stove Top"
//         },
//         {
//           "name": "mexican",
//           "id": 64457,
//           "display_name": "Mexican",
//           "type": "cuisine"
//         },
//         {
//           "name": "drinks",
//           "id": 64487,
//           "display_name": "Drinks",
//           "type": "meal"
//         },
//         {
//           "name": "dairy_free",
//           "id": 64463,
//           "display_name": "Dairy-Free",
//           "type": "dietary"
//         },
//         {
//           "name": "gluten_free",
//           "id": 64465,
//           "display_name": "Gluten-Free",
//           "type": "dietary"
//         },
//         {
//           "name": "brunch",
//           "id": 64484,
//           "display_name": "Brunch",
//           "type": "occasion"
//         },
//         {
//           "name": "under_30_minutes",
//           "id": 64472,
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_45_minutes",
//           "id": 8091747,
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_1_hour",
//           "id": 8091748,
//           "display_name": "Under 1 Hour",
//           "type": "difficulty"
//         }
//       ],
//       "nutrition": {},
//       "name": "Cafecito De Olla",
//       "approved_at": 1670259955,
//       "is_one_top": false,
//       "renditions": [
//         {
//           "width": 404,
//           "name": "mp4_404x720",
//           "maximum_bit_rate": null,
//           "height": 720,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264481/square_720/1669920137_00001.png",
//           "aspect": "portrait",
//           "url": "https://vid.tasty.co/output/264481/square_720/1669920137",
//           "duration": 23482,
//           "bit_rate": 1423,
//           "content_type": "video/mp4",
//           "minimum_bit_rate": null,
//           "container": "mp4",
//           "file_size": 4174906
//         },
//         {
//           "width": 180,
//           "minimum_bit_rate": null,
//           "bit_rate": 531,
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "url": "https://vid.tasty.co/output/264481/square_320/1669920137",
//           "duration": 23482,
//           "name": "mp4_180x320",
//           "maximum_bit_rate": null,
//           "height": 320,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264481/square_320/1669920137_00001.png",
//           "file_size": 1556586
//         },
//         {
//           "height": 720,
//           "file_size": 4174332,
//           "url": "https://vid.tasty.co/output/264481/landscape_720/1669920137",
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "name": "mp4_404x720",
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264481/landscape_720/1669920137_00001.png",
//           "duration": 23482,
//           "bit_rate": 1423,
//           "width": 404
//         },
//         {
//           "name": "mp4_270x480",
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264481/landscape_480/1669920137_00001.png",
//           "url": "https://vid.tasty.co/output/264481/landscape_480/1669920137",
//           "bit_rate": 852,
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "file_size": 2499938,
//           "duration": 23482,
//           "content_type": "video/mp4",
//           "width": 270,
//           "height": 480
//         },
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264481/1445289064805-h2exzu/1669920137_00001.png",
//           "file_size": null,
//           "url": "https://vid.tasty.co/output/264481/hls24_1669920137.m3u8",
//           "duration": 23524,
//           "bit_rate": null,
//           "content_type": "application/vnd.apple.mpegurl",
//           "minimum_bit_rate": 273,
//           "maximum_bit_rate": 2347,
//           "height": 1080,
//           "container": "ts",
//           "aspect": "portrait",
//           "width": 608,
//           "name": "low"
//         }
//       ],
//       "seo_title": "Café de Olla",
//       "video_id": 172016,
//       "brand_id": null,
//       "description": "Café de olla is a staple of a traditional Mexican breakfast, or is delicious when enjoyed alongside your favorite pan dulce, or sweet bread. Have a little sip of Mexico every morning while leaving your home smelling amazing!",
//       "updated_at": 1670259955,
//       "cook_time_minutes": 10,
//       "promotion": "full",
//       "nutrition_visibility": "auto",
//       "brand": null,
//       "draft_status": "published",
//       "inspired_by_url": null,
//       "video_ad_content": "none",
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "is_shoppable": true,
//       "beauty_url": null,
//       "total_time_tier": {
//         "tier": "under_15_minutes",
//         "display_tier": "Under 15 minutes"
//       },
//       "instructions": [
//         {
//           "start_time": 4666,
//           "appliance": null,
//           "end_time": 18333,
//           "temperature": null,
//           "id": 73916,
//           "position": 1,
//           "display_text": "In a medium pot, bring the water to a simmer over medium-low heat. Add the coffee grounds and piloncillo and stir for 2 minutes to dissolve the piloncillo. Add the cinnamon sticks, star anise pods, and cloves, and stir for 1 minute. Cover the pot and let the coffee simmer for 10 minutes."
//         },
//         {
//           "start_time": 19000,
//           "appliance": null,
//           "end_time": 20333,
//           "temperature": null,
//           "id": 73917,
//           "position": 2,
//           "display_text": "Strain the coffee and serve immediately."
//         },
//         {
//           "start_time": 21000,
//           "appliance": null,
//           "end_time": 22833,
//           "temperature": null,
//           "id": 73918,
//           "position": 3,
//           "display_text": "Enjoy!"
//         }
//       ],
//       "keywords": "",
//       "price": {
//         "total": 350,
//         "updated_at": "2022-12-24T06:30:57+01:00",
//         "portion": 50,
//         "consumption_total": 250,
//         "consumption_portion": 50
//       },
//       "thumbnail_alt_text": "",
//       "servings_noun_plural": "cups",
//       "language": "eng",
//       "servings_noun_singular": "cup",
//       "num_servings": 6,
//       "buzz_id": null,
//       "created_at": 1669920251,
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/4d97c79cffb64f638f9510476fd04e5a/BFV96941_CafecitoDeOlla_9x16_2.mp4",
//       "canonical_id": "recipe:8556",
//       "prep_time_minutes": 5,
//       "compilations": [],
//       "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/414301.jpg",
//       "topics": [
//         {
//           "name": "5 Ingredients or Less",
//           "slug": "5-ingredients-or-less"
//         },
//         {
//           "name": "Sunday Brunch",
//           "slug": "brunch"
//         },
//         {
//           "name": "Mexican",
//           "slug": "mexican"
//         }
//       ],
//       "yields": "Makes 6 cups"
//     },
//     {
//       "servings_noun_singular": "serving",
//       "name": "Black Hummus",
//       "created_at": 1669921007,
//       "topics": [
//         {
//           "name": "Best Vegetarian",
//           "slug": "best-vegetarian"
//         },
//         {
//           "name": "Bread Lovers",
//           "slug": "bread"
//         },
//         {
//           "name": "Vegan",
//           "slug": "vegan"
//         }
//       ],
//       "video_id": 167312,
//       "language": "eng",
//       "price": {
//         "total": 4750,
//         "updated_at": "2022-12-24T06:30:57+01:00",
//         "portion": 1200,
//         "consumption_total": 900,
//         "consumption_portion": 250
//       },
//       "draft_status": "published",
//       "total_time_minutes": 28,
//       "video_ad_content": "none",
//       "yields": "Servings: 4",
//       "nutrition_visibility": "auto",
//       "brand_id": null,
//       "inspired_by_url": null,
//       "video_url": "https://vid.tasty.co/output/264486/hls24_1669920634.m3u8",
//       "slug": "black-hummus",
//       "id": 8557,
//       "brand": null,
//       "sections": [
//         {
//           "components": [
//             {
//               "raw_text": "1½ cups black sesame seeds",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_plural": "black sesame seeds",
//                 "id": 3979,
//                 "display_singular": "black sesame seed",
//                 "updated_at": 1524111598,
//                 "name": "black sesame seeds",
//                 "created_at": 1524111598
//               },
//               "id": 98011,
//               "position": 2,
//               "measurements": [
//                 {
//                   "quantity": "1 ½",
//                   "id": 716326,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   }
//                 },
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "190",
//                   "id": 716325
//                 }
//               ]
//             },
//             {
//               "raw_text": "3 tablespoons vegetable oil",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035288,
//                 "name": "vegetable oil",
//                 "created_at": 1493314628,
//                 "display_plural": "vegetable oils",
//                 "id": 20,
//                 "display_singular": "vegetable oil"
//               },
//               "id": 98012,
//               "position": 3,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon"
//                   },
//                   "quantity": "3",
//                   "id": 716327
//                 }
//               ]
//             }
//           ],
//           "name": "Black Sesame Tahini",
//           "position": 1
//         },
//         {
//           "components": [
//             {
//               "ingredient": {
//                 "name": "garbanzo beans",
//                 "created_at": 1500090460,
//                 "display_plural": "garbanzo beans",
//                 "id": 2135,
//                 "display_singular": "garbanzo bean",
//                 "updated_at": 1521567836
//               },
//               "id": 98014,
//               "position": 5,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "can",
//                     "display_plural": "cans",
//                     "display_singular": "can",
//                     "abbreviation": "can"
//                   },
//                   "quantity": "1",
//                   "id": 716335
//                 },
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "ounce",
//                     "display_plural": "oz",
//                     "display_singular": "oz",
//                     "abbreviation": "oz"
//                   },
//                   "quantity": "15",
//                   "id": 716334
//                 },
//                 {
//                   "unit": {
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric"
//                   },
//                   "quantity": "375",
//                   "id": 716333
//                 }
//               ],
//               "raw_text": "1 (15-ounce) can of garbanzo beans, drained and rinsed, plus more for garnish",
//               "extra_comment": "draned and rinsed, plus more for garnish"
//             },
//             {
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "clove",
//                     "display_plural": "cloves",
//                     "display_singular": "clove",
//                     "abbreviation": "clove"
//                   },
//                   "quantity": "5",
//                   "id": 716330
//                 }
//               ],
//               "raw_text": "5 black garlic cloves",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 6725,
//                 "display_singular": "black garlic",
//                 "updated_at": 1597157676,
//                 "name": "black garlic",
//                 "created_at": 1597157676,
//                 "display_plural": "black garlics"
//               },
//               "id": 98015,
//               "position": 6
//             },
//             {
//               "position": 7,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "clove",
//                     "system": "none",
//                     "name": "clove",
//                     "display_plural": "cloves",
//                     "display_singular": "clove"
//                   },
//                   "quantity": "2",
//                   "id": 716329
//                 }
//               ],
//               "raw_text": "2 garlic cloves",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035285,
//                 "name": "garlic",
//                 "created_at": 1493744766,
//                 "display_plural": "garlics",
//                 "id": 95,
//                 "display_singular": "garlic"
//               },
//               "id": 98016
//             },
//             {
//               "ingredient": {
//                 "created_at": 1494624947,
//                 "display_plural": "lemon juices",
//                 "id": 271,
//                 "display_singular": "lemon juice",
//                 "updated_at": 1509035274,
//                 "name": "lemon juice"
//               },
//               "id": 98017,
//               "position": 8,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp"
//                   },
//                   "quantity": "2",
//                   "id": 716339
//                 }
//               ],
//               "raw_text": "2 tablespoons lemon juice",
//               "extra_comment": ""
//             },
//             {
//               "raw_text": "2 tablespoons water, plus more as needed",
//               "extra_comment": "plus more as needed",
//               "ingredient": {
//                 "display_plural": "waters",
//                 "id": 197,
//                 "display_singular": "water",
//                 "updated_at": 1509035280,
//                 "name": "water",
//                 "created_at": 1494124627
//               },
//               "id": 98018,
//               "position": 9,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons"
//                   },
//                   "quantity": "2",
//                   "id": 716337
//                 }
//               ]
//             },
//             {
//               "ingredient": {
//                 "created_at": 1493306183,
//                 "display_plural": "olive oils",
//                 "id": 4,
//                 "display_singular": "olive oil",
//                 "updated_at": 1509035290,
//                 "name": "olive oil"
//               },
//               "id": 98019,
//               "position": 10,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon"
//                   },
//                   "quantity": "3",
//                   "id": 716328
//                 }
//               ],
//               "raw_text": "3 tablespoons olive oil, plus more as needed",
//               "extra_comment": "plus more as needed"
//             },
//             {
//               "extra_comment": "to taste",
//               "ingredient": {
//                 "display_singular": "kosher salt",
//                 "updated_at": 1509035289,
//                 "name": "kosher salt",
//                 "created_at": 1493307153,
//                 "display_plural": "kosher salts",
//                 "id": 11
//               },
//               "id": 98020,
//               "position": 11,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "0",
//                   "id": 716331
//                 }
//               ],
//               "raw_text": "Kosher salt, to taste"
//             },
//             {
//               "measurements": [
//                 {
//                   "unit": {
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none"
//                   },
//                   "quantity": "0",
//                   "id": 716332
//                 }
//               ],
//               "raw_text": "Red pepper sauce, for garnish",
//               "extra_comment": "for garnish",
//               "ingredient": {
//                 "updated_at": 1669927756,
//                 "name": "red pepper sauce",
//                 "created_at": 1669927756,
//                 "display_plural": "red pepper sauces",
//                 "id": 10540,
//                 "display_singular": "red pepper sauce"
//               },
//               "id": 98021,
//               "position": 12
//             },
//             {
//               "ingredient": {
//                 "name": "fresh cilantro",
//                 "created_at": 1494974463,
//                 "display_plural": "fresh cilantros",
//                 "id": 372,
//                 "display_singular": "fresh cilantro",
//                 "updated_at": 1509035266
//               },
//               "id": 98022,
//               "position": 13,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "0",
//                   "id": 716336
//                 }
//               ],
//               "raw_text": "Chopped fresh cilantro, for garnish",
//               "extra_comment": "for garnish, chopped"
//             },
//             {
//               "id": 98023,
//               "position": 14,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "0",
//                   "id": 716338
//                 }
//               ],
//               "raw_text": "Pita or crackers, for serving",
//               "extra_comment": "or crackers, for serving",
//               "ingredient": {
//                 "updated_at": 1509035190,
//                 "name": "pita bread",
//                 "created_at": 1496708342,
//                 "display_plural": "pita breads",
//                 "id": 1395,
//                 "display_singular": "pita bread"
//               }
//             }
//           ],
//           "name": "Black Hummus",
//           "position": 2
//         }
//       ],
//       "nutrition": {},
//       "buzz_id": null,
//       "tips_and_ratings_enabled": true,
//       "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/414312.jpg",
//       "facebook_posts": [],
//       "renditions": [
//         {
//           "width": 404,
//           "name": "mp4_404x720",
//           "maximum_bit_rate": null,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264486/square_720/1669920634_00001.png",
//           "file_size": 5941495,
//           "bit_rate": 2173,
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "height": 720,
//           "container": "mp4",
//           "url": "https://vid.tasty.co/output/264486/square_720/1669920634",
//           "duration": 21874,
//           "content_type": "video/mp4"
//         },
//         {
//           "height": 320,
//           "url": "https://vid.tasty.co/output/264486/square_320/1669920634",
//           "duration": 21874,
//           "bit_rate": 783,
//           "aspect": "portrait",
//           "width": 180,
//           "minimum_bit_rate": null,
//           "name": "mp4_180x320",
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264486/square_320/1669920634_00001.png",
//           "file_size": 2139021,
//           "content_type": "video/mp4"
//         },
//         {
//           "bit_rate": 2171,
//           "content_type": "video/mp4",
//           "width": 404,
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "height": 720,
//           "file_size": 5935535,
//           "url": "https://vid.tasty.co/output/264486/landscape_720/1669920634",
//           "duration": 21874,
//           "aspect": "portrait",
//           "name": "mp4_404x720",
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264486/landscape_720/1669920634_00001.png"
//         },
//         {
//           "minimum_bit_rate": null,
//           "name": "mp4_270x480",
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "file_size": 3521498,
//           "content_type": "video/mp4",
//           "bit_rate": 1288,
//           "aspect": "portrait",
//           "width": 270,
//           "height": 480,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264486/landscape_480/1669920634_00001.png",
//           "url": "https://vid.tasty.co/output/264486/landscape_480/1669920634",
//           "duration": 21874
//         },
//         {
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264486/square_720/1669920634_00001.png",
//           "url": "https://vid.tasty.co/output/264486/square_720/1669920634",
//           "content_type": "video/mp4",
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "height": 720,
//           "file_size": 5941495,
//           "duration": 21874,
//           "bit_rate": 2173,
//           "aspect": "portrait",
//           "width": 404,
//           "name": "mp4_404x720"
//         },
//         {
//           "bit_rate": 783,
//           "width": 180,
//           "name": "mp4_180x320",
//           "maximum_bit_rate": null,
//           "height": 320,
//           "container": "mp4",
//           "url": "https://vid.tasty.co/output/264486/square_320/1669920634",
//           "duration": 21874,
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264486/square_320/1669920634_00001.png",
//           "file_size": 2139021,
//           "content_type": "video/mp4"
//         },
//         {
//           "file_size": 5935535,
//           "url": "https://vid.tasty.co/output/264486/landscape_720/1669920634",
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "name": "mp4_404x720",
//           "width": 404,
//           "maximum_bit_rate": null,
//           "height": 720,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264486/landscape_720/1669920634_00001.png",
//           "duration": 21874,
//           "bit_rate": 2171,
//           "content_type": "video/mp4"
//         },
//         {
//           "container": "mp4",
//           "file_size": 3521498,
//           "url": "https://vid.tasty.co/output/264486/landscape_480/1669920634",
//           "duration": 21874,
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "height": 480,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264486/landscape_480/1669920634_00001.png",
//           "bit_rate": 1288,
//           "content_type": "video/mp4",
//           "width": 270,
//           "name": "mp4_270x480",
//           "maximum_bit_rate": null
//         },
//         {
//           "name": "low",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264486/1445289064805-h2exzu/1669920634_00001.png",
//           "file_size": null,
//           "aspect": "portrait",
//           "width": 608,
//           "content_type": "application/vnd.apple.mpegurl",
//           "minimum_bit_rate": 276,
//           "maximum_bit_rate": 3661,
//           "height": 1080,
//           "container": "ts",
//           "url": "https://vid.tasty.co/output/264486/hls24_1669920634.m3u8",
//           "duration": 21897,
//           "bit_rate": null
//         },
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/264486/1445289064805-h2exzu/1669920634_00001.png",
//           "url": "https://vid.tasty.co/output/264486/hls24_1669920634.m3u8",
//           "bit_rate": null,
//           "width": 608,
//           "minimum_bit_rate": 276,
//           "maximum_bit_rate": 3661,
//           "height": 1080,
//           "container": "ts",
//           "file_size": null,
//           "duration": 21897,
//           "content_type": "application/vnd.apple.mpegurl",
//           "aspect": "portrait",
//           "name": "low"
//         }
//       ],
//       "beauty_url": null,
//       "seo_title": "",
//       "approved_at": 1669930812,
//       "tags": [
//         {
//           "name": "under_30_minutes",
//           "id": 64472,
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_45_minutes",
//           "id": 8091747,
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "sides",
//           "id": 64490,
//           "display_name": "Sides",
//           "type": "meal"
//         },
//         {
//           "id": 64468,
//           "display_name": "Vegan",
//           "type": "dietary",
//           "name": "vegan"
//         },
//         {
//           "type": "cuisine",
//           "name": "middle_eastern",
//           "id": 64458,
//           "display_name": "Middle Eastern"
//         },
//         {
//           "type": "dietary",
//           "name": "vegetarian",
//           "id": 64469,
//           "display_name": "Vegetarian"
//         },
//         {
//           "name": "appetizers",
//           "id": 64481,
//           "display_name": "Appetizers",
//           "type": "meal"
//         }
//       ],
//       "aspect_ratio": "9:16",
//       "description": "Hummus has taken the world of chips and dip by storm. Most stores carry a wild assortment of, shall we say, creative takes on this humble, yet iconic, Middle Eastern and North African snack. However, despite the look of this black hummus, you’ll be surprised to find that this recipe actually brings it back to the basics! Remember, it’s okay to have fun with food sometimes, just don’t call it traditional!",
//       "total_time_tier": {
//         "tier": "under_30_minutes",
//         "display_tier": "Under 30 minutes"
//       },
//       "promotion": "full",
//       "instructions": [
//         {
//           "appliance": null,
//           "end_time": 4833,
//           "temperature": null,
//           "id": 73920,
//           "position": 1,
//           "display_text": "Make the black sesame tahini: Add the black sesame seeds to a large pan and cook over medium heat, stirring occasionally, for 3–5 minutes, until toasted and aromatic. Watch carefully so the sesame seeds do not burn.",
//           "start_time": 3000
//         },
//         {
//           "display_text": "Add the toasted sesame seeds and vegetable oil to a high-powered blender or food processor. Blend on high speed for 2–3 minutes, until completely smooth with no grittiness. Pour the tahini into an airtight container and set aside. It will keep in a cool, dark place at room temperature for up to 1 month. Vigorously shake the container if the oil separates.",
//           "start_time": 5333,
//           "appliance": null,
//           "end_time": 7016,
//           "temperature": null,
//           "id": 73921,
//           "position": 2
//         },
//         {
//           "start_time": 8700,
//           "appliance": null,
//           "end_time": 12533,
//           "temperature": null,
//           "id": 73922,
//           "position": 3,
//           "display_text": "Make the black hummus: For a smoother texture, peel the outer skins off of the garbanzo beans. Add the garbanzo beans to a food processor with 4–5 tablespoons of the black sesame tahini, the black garlic, garlic, lemon juice, water, and olive oil. Blend on high speed, adding more water or olive oil until your desired consistency is reached. Season with salt to taste."
//         },
//         {
//           "start_time": 14700,
//           "appliance": null,
//           "end_time": 17216,
//           "temperature": null,
//           "id": 73923,
//           "position": 4,
//           "display_text": "Transfer the hummus to a serving bowl or plate. Garnish with more olive oil, chickpeas, red pepper sauce, and cilantro, or your favorite toppings, and serve with pita or crackers. Leftover hummus will keep in an airtight container in the refrigerator for up to 5 days."
//         },
//         {
//           "position": 5,
//           "display_text": "Enjoy!",
//           "start_time": 20000,
//           "appliance": null,
//           "end_time": 21833,
//           "temperature": null,
//           "id": 73924
//         }
//       ],
//       "keywords": "",
//       "user_ratings": {
//         "count_negative": 0,
//         "count_positive": 1,
//         "score": 1
//       },
//       "show_id": 17,
//       "num_servings": 4,
//       "country": "US",
//       "thumbnail_alt_text": "",
//       "updated_at": 1669930812,
//       "is_one_top": false,
//       "servings_noun_plural": "servings",
//       "is_shoppable": true,
//       "compilations": [],
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "credits": [
//         {
//           "type": "internal",
//           "name": "Murad Yasin"
//         }
//       ],
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/194e80319ead46b3bf9084d93ca9c767/BFV95576_BlackHummus_9x16_V02.mp4",
//       "canonical_id": "recipe:8557",
//       "cook_time_minutes": 5,
//       "prep_time_minutes": 20
//     },
//     {
//       "canonical_id": "compilation:3357",
//       "facebook_posts": [],
//       "id": 3357,
//       "slug": "2-simple-beautiful-appetizers-starring-nuts-fb",
//       "language": "eng",
//       "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/407908.jpg",
//       "credits": [
//         {
//           "name": "Ryan Panlasigui",
//           "type": "internal"
//         }
//       ],
//       "beauty_url": null,
//       "buzz_id": null,
//       "keywords": null,
//       "description": "The winter holidays just got a little warmer thanks to Fisher Nuts and these 2 show-stopping appetizers! ",
//       "updated_at": 1669911415,
//       "thumbnail_alt_text": "",
//       "renditions": [
//         {
//           "aspect": "square",
//           "width": 720,
//           "minimum_bit_rate": null,
//           "duration": 169599,
//           "bit_rate": 1760,
//           "content_type": "video/mp4",
//           "name": "mp4_720x720",
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/square_720/1667222967_00001.png",
//           "file_size": 37307912,
//           "url": "https://vid.tasty.co/output/260171/square_720/1667222967",
//           "maximum_bit_rate": null,
//           "height": 720
//         },
//         {
//           "aspect": "square",
//           "minimum_bit_rate": null,
//           "name": "mp4_320x320",
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "bit_rate": 625,
//           "url": "https://vid.tasty.co/output/260171/square_320/1667222967",
//           "duration": 169599,
//           "content_type": "video/mp4",
//           "width": 320,
//           "height": 320,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/square_320/1667222967_00001.png",
//           "file_size": 13235695
//         },
//         {
//           "duration": 169599,
//           "bit_rate": 1760,
//           "content_type": "video/mp4",
//           "minimum_bit_rate": null,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/landscape_720/1667222967_00001.png",
//           "url": "https://vid.tasty.co/output/260171/landscape_720/1667222967",
//           "aspect": "square",
//           "width": 720,
//           "name": "mp4_720x720",
//           "maximum_bit_rate": null,
//           "height": 720,
//           "container": "mp4",
//           "file_size": 37303975
//         },
//         {
//           "content_type": "video/mp4",
//           "aspect": "square",
//           "minimum_bit_rate": null,
//           "name": "mp4_480x480",
//           "file_size": 21863964,
//           "url": "https://vid.tasty.co/output/260171/landscape_480/1667222967",
//           "duration": 169599,
//           "bit_rate": 1032,
//           "width": 480,
//           "maximum_bit_rate": null,
//           "height": 480,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/landscape_480/1667222967_00001.png"
//         },
//         {
//           "minimum_bit_rate": 272,
//           "height": 1080,
//           "container": "ts",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/1445289064805-h2exzu/1667222967_00001.png",
//           "file_size": null,
//           "aspect": "square",
//           "width": 1080,
//           "name": "low",
//           "maximum_bit_rate": 3114,
//           "url": "https://vid.tasty.co/output/260171/hls24_1667222967.m3u8",
//           "duration": 169587,
//           "bit_rate": null,
//           "content_type": "application/vnd.apple.mpegurl"
//         }
//       ],
//       "video_id": 169505,
//       "video_url": "https://vid.tasty.co/output/260171/hls24_1667222967.m3u8",
//       "recipes": [
//         {
//           "facebook_posts": [],
//           "show_id": 17,
//           "tags": [
//             {
//               "name": "appetizers",
//               "id": 64481,
//               "display_name": "Appetizers",
//               "type": "meal"
//             },
//             {
//               "name": "under_30_minutes",
//               "id": 64472,
//               "display_name": "Under 30 Minutes",
//               "type": "difficulty"
//             },
//             {
//               "name": "christmas",
//               "id": 64473,
//               "display_name": "Christmas",
//               "type": "holiday"
//             },
//             {
//               "display_name": "Under 45 Minutes",
//               "type": "difficulty",
//               "name": "under_45_minutes",
//               "id": 8091747
//             },
//             {
//               "id": 8091748,
//               "display_name": "Under 1 Hour",
//               "type": "difficulty",
//               "name": "under_1_hour"
//             },
//             {
//               "id": 64469,
//               "display_name": "Vegetarian",
//               "type": "dietary",
//               "name": "vegetarian"
//             },
//             {
//               "name": "thanksgiving",
//               "id": 64479,
//               "display_name": "Thanksgiving",
//               "type": "holiday"
//             },
//             {
//               "name": "bake",
//               "id": 64492,
//               "display_name": "Bake",
//               "type": "cooking_style"
//             },
//             {
//               "name": "oven",
//               "id": 65846,
//               "display_name": "Oven",
//               "type": "appliance"
//             },
//             {
//               "id": 64503,
//               "display_name": "Casual Party",
//               "type": "occasion",
//               "name": "casual_party"
//             },
//             {
//               "name": "special_occasion",
//               "id": 188967,
//               "display_name": "Special Occasion",
//               "type": "occasion"
//             }
//           ],
//           "compilations": [
//             {
//               "facebook_posts": [],
//               "video_url": "https://vid.tasty.co/output/260171/hls24_1667222967.m3u8",
//               "name": "2 Simple, Beautiful Appetizers Starring Nuts",
//               "id": 3357,
//               "promotion": "full",
//               "approved_at": 1669911415,
//               "is_shoppable": false,
//               "keywords": null,
//               "show": [
//                 {
//                   "name": "Tasty",
//                   "id": 17
//                 }
//               ],
//               "draft_status": "published",
//               "language": "eng",
//               "country": "US",
//               "created_at": 1667240384,
//               "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/407908.jpg",
//               "buzz_id": null,
//               "video_id": 169505,
//               "slug": "2-simple-beautiful-appetizers-starring-nuts-fb",
//               "aspect_ratio": "1:1",
//               "description": "The winter holidays just got a little warmer thanks to Fisher Nuts and these 2 show-stopping appetizers! ",
//               "thumbnail_alt_text": "",
//               "canonical_id": "compilation:3357",
//               "beauty_url": null
//             }
//           ],
//           "video_ad_content": "co_branded",
//           "credits": [
//             {
//               "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/9f6df1667a954aaf83d677df76cb5fe0.png",
//               "name": "Fisher® Nuts",
//               "id": 67,
//               "type": "brand",
//               "slug": "fisher-r-nuts"
//             }
//           ],
//           "topics": [],
//           "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/a88338887a92494a9179c4700256a99d/FisherNuts_2SimpleBeautifulAppetizers_BFV96194_SQHero.mp4",
//           "nutrition_visibility": "auto",
//           "user_ratings": {
//             "count_positive": 0,
//             "score": null,
//             "count_negative": 0
//           },
//           "price": {
//             "updated_at": "2022-12-01T06:30:23+01:00",
//             "portion": 450,
//             "consumption_total": 800,
//             "consumption_portion": 200,
//             "total": 1800
//           },
//           "name": "Creamy Pecan-Stuffed Mushrooms",
//           "tips_and_ratings_enabled": true,
//           "language": "eng",
//           "show": {
//             "name": "Tasty",
//             "id": 17
//           },
//           "servings_noun_plural": "servings",
//           "renditions": [
//             {
//               "height": 720,
//               "file_size": 37307912,
//               "url": "https://vid.tasty.co/output/260171/square_720/1667222967",
//               "aspect": "square",
//               "minimum_bit_rate": null,
//               "maximum_bit_rate": null,
//               "width": 720,
//               "name": "mp4_720x720",
//               "container": "mp4",
//               "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/square_720/1667222967_00001.png",
//               "duration": 169599,
//               "bit_rate": 1760,
//               "content_type": "video/mp4"
//             },
//             {
//               "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/square_320/1667222967_00001.png",
//               "duration": 169599,
//               "bit_rate": 625,
//               "name": "mp4_320x320",
//               "maximum_bit_rate": null,
//               "container": "mp4",
//               "url": "https://vid.tasty.co/output/260171/square_320/1667222967",
//               "content_type": "video/mp4",
//               "aspect": "square",
//               "width": 320,
//               "minimum_bit_rate": null,
//               "height": 320,
//               "file_size": 13235695
//             },
//             {
//               "content_type": "video/mp4",
//               "width": 720,
//               "minimum_bit_rate": null,
//               "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/landscape_720/1667222967_00001.png",
//               "file_size": 37303975,
//               "url": "https://vid.tasty.co/output/260171/landscape_720/1667222967",
//               "duration": 169599,
//               "maximum_bit_rate": null,
//               "height": 720,
//               "container": "mp4",
//               "bit_rate": 1760,
//               "aspect": "square",
//               "name": "mp4_720x720"
//             },
//             {
//               "aspect": "square",
//               "width": 480,
//               "minimum_bit_rate": null,
//               "container": "mp4",
//               "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/landscape_480/1667222967_00001.png",
//               "file_size": 21863964,
//               "url": "https://vid.tasty.co/output/260171/landscape_480/1667222967",
//               "content_type": "video/mp4",
//               "name": "mp4_480x480",
//               "maximum_bit_rate": null,
//               "duration": 169599,
//               "bit_rate": 1032,
//               "height": 480
//             },
//             {
//               "file_size": null,
//               "aspect": "square",
//               "minimum_bit_rate": 272,
//               "name": "low",
//               "maximum_bit_rate": 3114,
//               "container": "ts",
//               "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/1445289064805-h2exzu/1667222967_00001.png",
//               "url": "https://vid.tasty.co/output/260171/hls24_1667222967.m3u8",
//               "duration": 169587,
//               "bit_rate": null,
//               "content_type": "application/vnd.apple.mpegurl",
//               "width": 1080,
//               "height": 1080
//             }
//           ],
//           "promotion": "full",
//           "instructions": [
//             {
//               "start_time": 0,
//               "appliance": "oven",
//               "end_time": 0,
//               "temperature": 400,
//               "id": 73685,
//               "position": 1,
//               "display_text": "Preheat the oven to 375°F (190°C). Line a baking sheet with parchment paper."
//             },
//             {
//               "end_time": 89333,
//               "temperature": null,
//               "id": 73686,
//               "position": 2,
//               "display_text": "Remove stems from the mushrooms and reserve for the filling. Arrange the mushroom caps, stem-side up, on the prepared baking sheet. Brush with the olive oil and season with salt to taste.",
//               "start_time": 74000,
//               "appliance": null
//             },
//             {
//               "start_time": 90666,
//               "appliance": null,
//               "end_time": 114166,
//               "temperature": null,
//               "id": 73687,
//               "position": 3,
//               "display_text": "Make the filling: Finely chop the mushroom stems, then add to a medium skillet with the butter and garlic. Cook over medium heat for about 5 minutes, or until the mushrooms and garlic have softened and browned slightly. Remove the pan from the heat."
//             },
//             {
//               "display_text": "Add 2 tablespoons of Fisher® Chopped Pecans, the onion powder, ¼ teaspoon salt, the pepper, and soy sauce to the skillet and stir to combine.",
//               "start_time": 116000,
//               "appliance": null,
//               "end_time": 129833,
//               "temperature": null,
//               "id": 73688,
//               "position": 4
//             },
//             {
//               "id": 73689,
//               "position": 5,
//               "display_text": "While the pan is still warm, but not hot, add the cream cheese, Parmesan, and thyme and stir until the mixture is smooth.",
//               "start_time": 132000,
//               "appliance": null,
//               "end_time": 138833,
//               "temperature": null
//             },
//             {
//               "temperature": null,
//               "id": 73690,
//               "position": 6,
//               "display_text": "Carefully fill each mushroom cap with the filling. Sprinkle the remaining 2 tablespoons of Fisher® Chopped Pecans and the panko bread crumbs on top of the mushrooms.",
//               "start_time": 142000,
//               "appliance": null,
//               "end_time": 155833
//             },
//             {
//               "id": 73691,
//               "position": 7,
//               "display_text": "Bake for 15 minutes, or until the mushrooms are tender and the topping has browned slightly.",
//               "start_time": 0,
//               "appliance": null,
//               "end_time": 0,
//               "temperature": null
//             },
//             {
//               "start_time": 0,
//               "appliance": null,
//               "end_time": 0,
//               "temperature": null,
//               "id": 73692,
//               "position": 8,
//               "display_text": "Serve warm."
//             },
//             {
//               "position": 9,
//               "display_text": "Enjoy!",
//               "start_time": 160000,
//               "appliance": null,
//               "end_time": 163166,
//               "temperature": null,
//               "id": 73693
//             }
//           ],
//           "id": 8528,
//           "aspect_ratio": "1:1",
//           "description": "",
//           "video_id": 169505,
//           "video_url": "https://vid.tasty.co/output/260171/hls24_1667222967.m3u8",
//           "beauty_url": null,
//           "seo_title": "",
//           "country": "US",
//           "brand_id": 67,
//           "nutrition": {},
//           "num_servings": 4,
//           "buzz_id": null,
//           "yields": "Servings: 4",
//           "keywords": "",
//           "servings_noun_singular": "serving",
//           "draft_status": "published",
//           "thumbnail_alt_text": "",
//           "total_time_minutes": 25,
//           "approved_at": 1669911399,
//           "is_one_top": false,
//           "is_shoppable": false,
//           "prep_time_minutes": 10,
//           "created_at": 1667240384,
//           "inspired_by_url": null,
//           "thumbnail_url": "https://s3.amazonaws.com/video-api-prod/assets/8e2264f6e8c949ed8e1c23bd7dceac70/mushroom.jpg",
//           "updated_at": 1669911400,
//           "canonical_id": "recipe:8528",
//           "cook_time_minutes": 15,
//           "brand": {
//             "id": 67,
//             "slug": "fisher-r-nuts",
//             "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/9f6df1667a954aaf83d677df76cb5fe0.png",
//             "name": "Fisher® Nuts"
//           },
//           "slug": "creamy-pecan-stuffed-mushrooms",
//           "sections": [
//             {
//               "components": [
//                 {
//                   "raw_text": "16 ounces cremini mushrooms",
//                   "extra_comment": "",
//                   "ingredient": {
//                     "updated_at": 1636638692,
//                     "name": "cremini mushrooms",
//                     "created_at": 1636638692,
//                     "display_plural": "cremini mushrooms",
//                     "id": 9326,
//                     "display_singular": "cremini mushroom"
//                   },
//                   "id": 97646,
//                   "position": 1,
//                   "measurements": [
//                     {
//                       "unit": {
//                         "display_plural": "g",
//                         "display_singular": "g",
//                         "abbreviation": "g",
//                         "system": "metric",
//                         "name": "gram"
//                       },
//                       "quantity": "450",
//                       "id": 716250
//                     },
//                     {
//                       "unit": {
//                         "system": "imperial",
//                         "name": "ounce",
//                         "display_plural": "oz",
//                         "display_singular": "oz",
//                         "abbreviation": "oz"
//                       },
//                       "quantity": "16",
//                       "id": 716249
//                     }
//                   ]
//                 },
//                 {
//                   "id": 97647,
//                   "position": 2,
//                   "measurements": [
//                     {
//                       "unit": {
//                         "system": "imperial",
//                         "name": "teaspoon",
//                         "display_plural": "teaspoons",
//                         "display_singular": "teaspoon",
//                         "abbreviation": "tsp"
//                       },
//                       "quantity": "2",
//                       "id": 716261
//                     }
//                   ],
//                   "raw_text": "2 teaspoons olive oil",
//                   "extra_comment": "",
//                   "ingredient": {
//                     "name": "olive oil",
//                     "created_at": 1493306183,
//                     "display_plural": "olive oils",
//                     "id": 4,
//                     "display_singular": "olive oil",
//                     "updated_at": 1509035290
//                   }
//                 },
//                 {
//                   "id": 97648,
//                   "position": 3,
//                   "measurements": [
//                     {
//                       "unit": {
//                         "system": "imperial",
//                         "name": "teaspoon",
//                         "display_plural": "teaspoons",
//                         "display_singular": "teaspoon",
//                         "abbreviation": "tsp"
//                       },
//                       "quantity": "¼",
//                       "id": 716256
//                     }
//                   ],
//                   "raw_text": "¼ teaspoon kosher salt, plus more to taste",
//                   "extra_comment": "plus more to taste",
//                   "ingredient": {
//                     "display_plural": "kosher salts",
//                     "id": 11,
//                     "display_singular": "kosher salt",
//                     "updated_at": 1509035289,
//                     "name": "kosher salt",
//                     "created_at": 1493307153
//                   }
//                 },
//                 {
//                   "raw_text": "1 tablespoon unsalted butter",
//                   "extra_comment": "",
//                   "ingredient": {
//                     "updated_at": 1509035272,
//                     "name": "unsalted butter",
//                     "created_at": 1494806355,
//                     "display_plural": "unsalted butters",
//                     "id": 291,
//                     "display_singular": "unsalted butter"
//                   },
//                   "id": 97649,
//                   "position": 4,
//                   "measurements": [
//                     {
//                       "quantity": "1",
//                       "id": 716260,
//                       "unit": {
//                         "system": "imperial",
//                         "name": "tablespoon",
//                         "display_plural": "tablespoons",
//                         "display_singular": "tablespoon",
//                         "abbreviation": "tbsp"
//                       }
//                     }
//                   ]
//                 },
//                 {
//                   "extra_comment": "minced",
//                   "ingredient": {
//                     "id": 10426,
//                     "display_singular": "small garlic clove",
//                     "updated_at": 1667252783,
//                     "name": "small garlic clove",
//                     "created_at": 1667252783,
//                     "display_plural": "small garlic cloves"
//                   },
//                   "id": 97650,
//                   "position": 5,
//                   "measurements": [
//                     {
//                       "unit": {
//                         "display_plural": "",
//                         "display_singular": "",
//                         "abbreviation": "",
//                         "system": "none",
//                         "name": ""
//                       },
//                       "quantity": "1",
//                       "id": 716254
//                     }
//                   ],
//                   "raw_text": "1 small clove of garlic, minced"
//                 },
//                 {
//                   "raw_text": "4 tablespoons Fisher® Chopped Pecans, divided",
//                   "extra_comment": "divided",
//                   "ingredient": {
//                     "name": "Fisher® Chopped Pecans",
//                     "created_at": 1667240700,
//                     "display_plural": "Fisher® Chopped Pecans",
//                     "id": 10422,
//                     "display_singular": "Fisher® Chopped Pecan",
//                     "updated_at": 1667240700
//                   },
//                   "id": 97651,
//                   "position": 6,
//                   "measurements": [
//                     {
//                       "unit": {
//                         "system": "imperial",
//                         "name": "tablespoon",
//                         "display_plural": "tablespoons",
//                         "display_singular": "tablespoon",
//                         "abbreviation": "tbsp"
//                       },
//                       "quantity": "4",
//                       "id": 716252
//                     }
//                   ]
//                 },
//                 {
//                   "extra_comment": "",
//                   "ingredient": {
//                     "updated_at": 1509035289,
//                     "name": "onion powder",
//                     "created_at": 1493307116,
//                     "display_plural": "onion powders",
//                     "id": 8,
//                     "display_singular": "onion powder"
//                   },
//                   "id": 97652,
//                   "position": 7,
//                   "measurements": [
//                     {
//                       "unit": {
//                         "system": "imperial",
//                         "name": "teaspoon",
//                         "display_plural": "teaspoons",
//                         "display_singular": "teaspoon",
//                         "abbreviation": "tsp"
//                       },
//                       "quantity": "¼",
//                       "id": 716253
//                     }
//                   ],
//                   "raw_text": "¼ teaspoon onion powder"
//                 },
//                 {
//                   "extra_comment": "",
//                   "ingredient": {
//                     "name": "freshly ground black pepper",
//                     "created_at": 1493925438,
//                     "display_plural": "freshly ground black peppers",
//                     "id": 166,
//                     "display_singular": "freshly ground black pepper",
//                     "updated_at": 1509035282
//                   },
//                   "id": 97653,
//                   "position": 8,
//                   "measurements": [
//                     {
//                       "unit": {
//                         "abbreviation": "tsp",
//                         "system": "imperial",
//                         "name": "teaspoon",
//                         "display_plural": "teaspoons",
//                         "display_singular": "teaspoon"
//                       },
//                       "quantity": "¼",
//                       "id": 716255
//                     }
//                   ],
//                   "raw_text": "¼ teaspoon freshly ground black pepper"
//                 },
//                 {
//                   "raw_text": "1 teaspoon soy sauce",
//                   "extra_comment": "",
//                   "ingredient": {
//                     "updated_at": 1509035287,
//                     "name": "soy sauce",
//                     "created_at": 1493314932,
//                     "display_plural": "soy sauces",
//                     "id": 28,
//                     "display_singular": "soy sauce"
//                   },
//                   "id": 97654,
//                   "position": 9,
//                   "measurements": [
//                     {
//                       "unit": {
//                         "system": "imperial",
//                         "name": "teaspoon",
//                         "display_plural": "teaspoons",
//                         "display_singular": "teaspoon",
//                         "abbreviation": "tsp"
//                       },
//                       "quantity": "1",
//                       "id": 716251
//                     }
//                   ]
//                 },
//                 {
//                   "raw_text": "4 ounces cream cheese",
//                   "extra_comment": "",
//                   "ingredient": {
//                     "updated_at": 1509035276,
//                     "name": "cream cheese",
//                     "created_at": 1494297000,
//                     "display_plural": "cream cheeses",
//                     "id": 242,
//                     "display_singular": "cream cheese"
//                   },
//                   "id": 97656,
//                   "position": 10,
//                   "measurements": [
//                     {
//                       "unit": {
//                         "name": "gram",
//                         "display_plural": "g",
//                         "display_singular": "g",
//                         "abbreviation": "g",
//                         "system": "metric"
//                       },
//                       "quantity": "115",
//                       "id": 716258
//                     },
//                     {
//                       "unit": {
//                         "system": "imperial",
//                         "name": "ounce",
//                         "display_plural": "oz",
//                         "display_singular": "oz",
//                         "abbreviation": "oz"
//                       },
//                       "quantity": "4",
//                       "id": 716257
//                     }
//                   ]
//                 },
//                 {
//                   "position": 11,
//                   "measurements": [
//                     {
//                       "quantity": "30",
//                       "id": 716263,
//                       "unit": {
//                         "display_singular": "g",
//                         "abbreviation": "g",
//                         "system": "metric",
//                         "name": "gram",
//                         "display_plural": "g"
//                       }
//                     },
//                     {
//                       "unit": {
//                         "system": "imperial",
//                         "name": "cup",
//                         "display_plural": "cups",
//                         "display_singular": "cup",
//                         "abbreviation": "c"
//                       },
//                       "quantity": "¼",
//                       "id": 716262
//                     }
//                   ],
//                   "raw_text": "¼ cup finely grated Parmesan cheese",
//                   "extra_comment": "",
//                   "ingredient": {
//                     "updated_at": 1509035109,
//                     "name": "finely grated parmesan cheese",
//                     "created_at": 1501634138,
//                     "display_plural": "finely grated parmesan cheeses",
//                     "id": 2785,
//                     "display_singular": "finely grated parmesan cheese"
//                   },
//                   "id": 97657
//                 },
//                 {
//                   "raw_text": "¼ teaspoon fresh thyme leaves, plus more for garnish",
//                   "extra_comment": "plus more for garnish",
//                   "ingredient": {
//                     "id": 4999,
//                     "display_singular": "fresh thyme leaf",
//                     "updated_at": 1545064023,
//                     "name": "fresh thyme leaves",
//                     "created_at": 1545064023,
//                     "display_plural": "fresh thyme leaves"
//                   },
//                   "id": 97655,
//                   "position": 12,
//                   "measurements": [
//                     {
//                       "unit": {
//                         "system": "imperial",
//                         "name": "teaspoon",
//                         "display_plural": "teaspoons",
//                         "display_singular": "teaspoon",
//                         "abbreviation": "tsp"
//                       },
//                       "quantity": "¼",
//                       "id": 716264
//                     }
//                   ]
//                 },
//                 {
//                   "raw_text": "2 tablespoons panko bread crumbs",
//                   "extra_comment": "",
//                   "ingredient": {
//                     "updated_at": 1509035128,
//                     "name": "panko bread crumbs",
//                     "created_at": 1500680486,
//                     "display_plural": "panko bread crumbs",
//                     "id": 2438,
//                     "display_singular": "panko bread crumb"
//                   },
//                   "id": 97658,
//                   "position": 13,
//                   "measurements": [
//                     {
//                       "id": 716259,
//                       "unit": {
//                         "display_singular": "tablespoon",
//                         "abbreviation": "tbsp",
//                         "system": "imperial",
//                         "name": "tablespoon",
//                         "display_plural": "tablespoons"
//                       },
//                       "quantity": "2"
//                     }
//                   ]
//                 }
//               ],
//               "name": null,
//               "position": 1
//             }
//           ],
//           "total_time_tier": {
//             "tier": "under_30_minutes",
//             "display_tier": "Under 30 minutes"
//           }
//         },
//         {
//           "sections": [
//             {
//               "name": null,
//               "position": 1,
//               "components": [
//                 {
//                   "measurements": [
//                     {
//                       "unit": {
//                         "system": "imperial",
//                         "name": "tablespoon",
//                         "display_plural": "tablespoons",
//                         "display_singular": "tablespoon",
//                         "abbreviation": "tbsp"
//                       },
//                       "quantity": "3",
//                       "id": 716248
//                     }
//                   ],
//                   "raw_text": "3 tablespoons salted butter, melted, plus more for greasing",
//                   "extra_comment": "melted, plus more for greasing",
//                   "ingredient": {
//                     "updated_at": 1509035242,
//                     "name": "salted butter",
//                     "created_at": 1495587107,
//                     "display_plural": "salted butters",
//                     "id": 675,
//                     "display_singular": "salted butter"
//                   },
//                   "id": 97638,
//                   "position": 1
//                 },
//                 {
//                   "position": 2,
//                   "measurements": [
//                     {
//                       "unit": {
//                         "display_singular": "g",
//                         "abbreviation": "g",
//                         "system": "metric",
//                         "name": "gram",
//                         "display_plural": "g"
//                       },
//                       "quantity": "225",
//                       "id": 716238
//                     },
//                     {
//                       "unit": {
//                         "display_singular": "oz",
//                         "abbreviation": "oz",
//                         "system": "imperial",
//                         "name": "ounce",
//                         "display_plural": "oz"
//                       },
//                       "quantity": "8",
//                       "id": 716237
//                     },
//                     {
//                       "unit": {
//                         "name": "roll",
//                         "display_plural": "rolls",
//                         "display_singular": "roll",
//                         "abbreviation": "roll",
//                         "system": "none"
//                       },
//                       "quantity": "1",
//                       "id": 716236
//                     }
//                   ],
//                   "raw_text": "1 8-ounce roll of phyllo dough, thawed",
//                   "extra_comment": "thawed",
//                   "ingredient": {
//                     "name": "phyllo dough",
//                     "created_at": 1495589321,
//                     "display_plural": "phyllo doughs",
//                     "id": 678,
//                     "display_singular": "phyllo dough",
//                     "updated_at": 1509035241
//                   },
//                   "id": 97639
//                 },
//                 {
//                   "raw_text": "6 ounces Brie cheese, rind removed",
//                   "extra_comment": "rind removed, cubed",
//                   "ingredient": {
//                     "updated_at": 1509035277,
//                     "name": "brie cheese",
//                     "created_at": 1494296781,
//                     "display_plural": "brie cheeses",
//                     "id": 240,
//                     "display_singular": "brie cheese"
//                   },
//                   "id": 97640,
//                   "position": 3,
//                   "measurements": [
//                     {
//                       "quantity": "170",
//                       "id": 716240,
//                       "unit": {
//                         "display_singular": "g",
//                         "abbreviation": "g",
//                         "system": "metric",
//                         "name": "gram",
//                         "display_plural": "g"
//                       }
//                     },
//                     {
//                       "quantity": "6",
//                       "id": 716239,
//                       "unit": {
//                         "system": "imperial",
//                         "name": "ounce",
//                         "display_plural": "oz",
//                         "display_singular": "oz",
//                         "abbreviation": "oz"
//                       }
//                     }
//                   ]
//                 },
//                 {
//                   "id": 97641,
//                   "position": 4,
//                   "measurements": [
//                     {
//                       "unit": {
//                         "system": "metric",
//                         "name": "gram",
//                         "display_plural": "g",
//                         "display_singular": "g",
//                         "abbreviation": "g"
//                       },
//                       "quantity": "125",
//                       "id": 716245
//                     },
//                     {
//                       "unit": {
//                         "system": "imperial",
//                         "name": "cup",
//                         "display_plural": "cups",
//                         "display_singular": "cup",
//                         "abbreviation": "c"
//                       },
//                       "quantity": "1",
//                       "id": 716242
//                     }
//                   ],
//                   "raw_text": "1 cup Fisher® Walnut Halves and Pieces",
//                   "extra_comment": "",
//                   "ingredient": {
//                     "id": 10421,
//                     "display_singular": "Fisher® Walnut Halves and Piece",
//                     "updated_at": 1667240519,
//                     "name": "Fisher® Walnut Halves and Pieces",
//                     "created_at": 1667240519,
//                     "display_plural": "Fisher® Walnut Halves and Pieces"
//                   }
//                 },
//                 {
//                   "measurements": [
//                     {
//                       "unit": {
//                         "display_plural": "",
//                         "display_singular": "",
//                         "abbreviation": "",
//                         "system": "none",
//                         "name": ""
//                       },
//                       "quantity": "1",
//                       "id": 716241
//                     }
//                   ],
//                   "raw_text": "1 Asian pear, cored and very thinly sliced",
//                   "extra_comment": "cored and very thinly sliced",
//                   "ingredient": {
//                     "created_at": 1620485502,
//                     "display_plural": "asian pears",
//                     "id": 8326,
//                     "display_singular": "asian pear",
//                     "updated_at": 1620485502,
//                     "name": "asian pear"
//                   },
//                   "id": 97642,
//                   "position": 5
//                 },
//                 {
//                   "extra_comment": "",
//                   "ingredient": {
//                     "name": "honey",
//                     "created_at": 1493430363,
//                     "display_plural": "honeys",
//                     "id": 52,
//                     "display_singular": "honey",
//                     "updated_at": 1509035286
//                   },
//                   "id": 97643,
//                   "position": 6,
//                   "measurements": [
//                     {
//                       "id": 716247,
//                       "unit": {
//                         "abbreviation": "tbsp",
//                         "system": "imperial",
//                         "name": "tablespoon",
//                         "display_plural": "tablespoons",
//                         "display_singular": "tablespoon"
//                       },
//                       "quantity": "2"
//                     }
//                   ],
//                   "raw_text": "2 tablespoons honey"
//                 },
//                 {
//                   "extra_comment": "",
//                   "ingredient": {
//                     "updated_at": 1545064023,
//                     "name": "fresh thyme leaves",
//                     "created_at": 1545064023,
//                     "display_plural": "fresh thyme leaves",
//                     "id": 4999,
//                     "display_singular": "fresh thyme leaf"
//                   },
//                   "id": 97644,
//                   "position": 7,
//                   "measurements": [
//                     {
//                       "unit": {
//                         "system": "imperial",
//                         "name": "tablespoon",
//                         "display_plural": "tablespoons",
//                         "display_singular": "tablespoon",
//                         "abbreviation": "tbsp"
//                       },
//                       "quantity": "2",
//                       "id": 716243
//                     }
//                   ],
//                   "raw_text": "2 teaspoons fresh thyme leaves"
//                 },
//                 {
//                   "raw_text": "¼ cup pomegranate seeds",
//                   "extra_comment": "",
//                   "ingredient": {
//                     "created_at": 1496791018,
//                     "display_plural": "pomegranate seeds",
//                     "id": 1504,
//                     "display_singular": "pomegranate seed",
//                     "updated_at": 1521567629,
//                     "name": "pomegranate seeds"
//                   },
//                   "id": 97645,
//                   "position": 8,
//                   "measurements": [
//                     {
//                       "unit": {
//                         "display_singular": "g",
//                         "abbreviation": "g",
//                         "system": "metric",
//                         "name": "gram",
//                         "display_plural": "g"
//                       },
//                       "quantity": "35",
//                       "id": 716246
//                     },
//                     {
//                       "unit": {
//                         "display_plural": "cups",
//                         "display_singular": "cup",
//                         "abbreviation": "c",
//                         "system": "imperial",
//                         "name": "cup"
//                       },
//                       "quantity": "¼",
//                       "id": 716244
//                     }
//                   ]
//                 }
//               ]
//             }
//           ],
//           "created_at": 1667240360,
//           "draft_status": "published",
//           "thumbnail_url": "https://s3.amazonaws.com/video-api-prod/assets/178ffbe048c748e9b2a68a0b0c32ef5b/brie.jpg",
//           "total_time_minutes": 20,
//           "is_one_top": false,
//           "country": "US",
//           "id": 8527,
//           "promotion": "full",
//           "brand_id": 67,
//           "name": "Brie And Walnut Bites",
//           "updated_at": 1669911403,
//           "video_ad_content": "co_branded",
//           "video_id": 169505,
//           "user_ratings": {
//             "count_positive": 0,
//             "score": null,
//             "count_negative": 0
//           },
//           "show_id": 17,
//           "renditions": [
//             {
//               "duration": 169599,
//               "bit_rate": 1760,
//               "content_type": "video/mp4",
//               "minimum_bit_rate": null,
//               "name": "mp4_720x720",
//               "maximum_bit_rate": null,
//               "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/square_720/1667222967_00001.png",
//               "file_size": 37307912,
//               "height": 720,
//               "aspect": "square",
//               "width": 720,
//               "container": "mp4",
//               "url": "https://vid.tasty.co/output/260171/square_720/1667222967"
//             },
//             {
//               "height": 320,
//               "container": "mp4",
//               "url": "https://vid.tasty.co/output/260171/square_320/1667222967",
//               "bit_rate": 625,
//               "width": 320,
//               "aspect": "square",
//               "minimum_bit_rate": null,
//               "name": "mp4_320x320",
//               "maximum_bit_rate": null,
//               "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/square_320/1667222967_00001.png",
//               "file_size": 13235695,
//               "duration": 169599,
//               "content_type": "video/mp4"
//             },
//             {
//               "container": "mp4",
//               "aspect": "square",
//               "width": 720,
//               "name": "mp4_720x720",
//               "height": 720,
//               "content_type": "video/mp4",
//               "minimum_bit_rate": null,
//               "maximum_bit_rate": null,
//               "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/landscape_720/1667222967_00001.png",
//               "file_size": 37303975,
//               "url": "https://vid.tasty.co/output/260171/landscape_720/1667222967",
//               "duration": 169599,
//               "bit_rate": 1760
//             },
//             {
//               "duration": 169599,
//               "content_type": "video/mp4",
//               "aspect": "square",
//               "name": "mp4_480x480",
//               "maximum_bit_rate": null,
//               "container": "mp4",
//               "file_size": 21863964,
//               "url": "https://vid.tasty.co/output/260171/landscape_480/1667222967",
//               "height": 480,
//               "minimum_bit_rate": null,
//               "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/landscape_480/1667222967_00001.png",
//               "bit_rate": 1032,
//               "width": 480
//             },
//             {
//               "bit_rate": null,
//               "content_type": "application/vnd.apple.mpegurl",
//               "aspect": "square",
//               "width": 1080,
//               "name": "low",
//               "height": 1080,
//               "container": "ts",
//               "file_size": null,
//               "duration": 169587,
//               "minimum_bit_rate": 272,
//               "maximum_bit_rate": 3114,
//               "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/1445289064805-h2exzu/1667222967_00001.png",
//               "url": "https://vid.tasty.co/output/260171/hls24_1667222967.m3u8"
//             }
//           ],
//           "beauty_url": null,
//           "is_shoppable": false,
//           "canonical_id": "recipe:8527",
//           "brand": {
//             "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/9f6df1667a954aaf83d677df76cb5fe0.png",
//             "name": "Fisher® Nuts",
//             "id": 67,
//             "slug": "fisher-r-nuts"
//           },
//           "nutrition": {},
//           "yields": "Makes 24 tartlets",
//           "slug": "brie-and-walnut-bites",
//           "aspect_ratio": "1:1",
//           "servings_noun_plural": "tartlets",
//           "total_time_tier": {
//             "tier": "under_30_minutes",
//             "display_tier": "Under 30 minutes"
//           },
//           "instructions": [
//             {
//               "display_text": "Preheat the oven to 375°F (190°C). Brush a 24-cup mini muffin tin with melted butter.",
//               "start_time": 0,
//               "appliance": "oven",
//               "end_time": 0,
//               "temperature": 375,
//               "id": 73677,
//               "position": 1
//             },
//             {
//               "display_text": "Unroll the phyllo dough on a cutting board. Cut through the stack in a 5 x 3 grid to make 15 2½-inch squares per sheet. Any remaining dough scraps can be refrigerated or frozen for another use.",
//               "start_time": 7000,
//               "appliance": null,
//               "end_time": 13500,
//               "temperature": null,
//               "id": 73678,
//               "position": 2
//             },
//             {
//               "temperature": null,
//               "id": 73679,
//               "position": 3,
//               "display_text": "Gently press 2–3 sheets of phyllo dough into each muffin cup, then brush with melted butter. Repeat to make 2 more layers of dough, brushing with melted butter between.",
//               "start_time": 16000,
//               "appliance": null,
//               "end_time": 28500
//             },
//             {
//               "appliance": null,
//               "end_time": 64666,
//               "temperature": null,
//               "id": 73680,
//               "position": 4,
//               "display_text": "Reserve 24 of the larger Fisher® Walnut Halves and Pieces, then fill each phyllo cup with a cube of Brie, ½ teaspoon of the smaller walnuts, and a few small slices of pear. Place one of the reserved larger Fisher walnut halves on top of each cup. Drizzle each cup with about ¼ teaspoon of honey and sprinkle with thyme.",
//               "start_time": 35166
//             },
//             {
//               "appliance": null,
//               "end_time": 0,
//               "temperature": null,
//               "id": 73681,
//               "position": 5,
//               "display_text": "Bake the tartlets for 8–10 minutes, or until the phyllo cups are browned and the cheese is bubbly. Remove from the oven and let cool slightly before carefully removing the tartlets from the tin.",
//               "start_time": 0
//             },
//             {
//               "start_time": 0,
//               "appliance": null,
//               "end_time": 0,
//               "temperature": null,
//               "id": 73682,
//               "position": 6,
//               "display_text": "Garnish each tartlet with 3 pomegranate seeds."
//             },
//             {
//               "display_text": "Serve warm.",
//               "start_time": 0,
//               "appliance": null,
//               "end_time": 0,
//               "temperature": null,
//               "id": 73683,
//               "position": 7
//             },
//             {
//               "start_time": 71000,
//               "appliance": null,
//               "end_time": 73166,
//               "temperature": null,
//               "id": 73684,
//               "position": 8,
//               "display_text": "Enjoy!"
//             }
//           ],
//           "num_servings": 24,
//           "approved_at": 1669911402,
//           "nutrition_visibility": "auto",
//           "tips_and_ratings_enabled": true,
//           "price": {
//             "consumption_portion": 50,
//             "total": 1800,
//             "updated_at": "2022-12-01T06:30:23+01:00",
//             "portion": 50,
//             "consumption_total": 750
//           },
//           "show": {
//             "name": "Tasty",
//             "id": 17
//           },
//           "description": "",
//           "inspired_by_url": null,
//           "thumbnail_alt_text": "",
//           "video_url": "https://vid.tasty.co/output/260171/hls24_1667222967.m3u8",
//           "facebook_posts": [],
//           "language": "eng",
//           "cook_time_minutes": 10,
//           "topics": [],
//           "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/a88338887a92494a9179c4700256a99d/FisherNuts_2SimpleBeautifulAppetizers_BFV96194_SQHero.mp4",
//           "prep_time_minutes": 10,
//           "tags": [
//             {
//               "id": 64472,
//               "display_name": "Under 30 Minutes",
//               "type": "difficulty",
//               "name": "under_30_minutes"
//             },
//             {
//               "name": "christmas",
//               "id": 64473,
//               "display_name": "Christmas",
//               "type": "holiday"
//             },
//             {
//               "name": "appetizers",
//               "id": 64481,
//               "display_name": "Appetizers",
//               "type": "meal"
//             },
//             {
//               "name": "under_45_minutes",
//               "id": 8091747,
//               "display_name": "Under 45 Minutes",
//               "type": "difficulty"
//             },
//             {
//               "id": 8091748,
//               "display_name": "Under 1 Hour",
//               "type": "difficulty",
//               "name": "under_1_hour"
//             },
//             {
//               "display_name": "Vegetarian",
//               "type": "dietary",
//               "name": "vegetarian",
//               "id": 64469
//             }
//           ],
//           "compilations": [
//             {
//               "country": "US",
//               "created_at": 1667240384,
//               "language": "eng",
//               "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/407908.jpg",
//               "beauty_url": null,
//               "slug": "2-simple-beautiful-appetizers-starring-nuts-fb",
//               "draft_status": "published",
//               "canonical_id": "compilation:3357",
//               "id": 3357,
//               "video_id": 169505,
//               "keywords": null,
//               "facebook_posts": [],
//               "show": [
//                 {
//                   "name": "Tasty",
//                   "id": 17
//                 }
//               ],
//               "thumbnail_alt_text": "",
//               "video_url": "https://vid.tasty.co/output/260171/hls24_1667222967.m3u8",
//               "name": "2 Simple, Beautiful Appetizers Starring Nuts",
//               "aspect_ratio": "1:1",
//               "is_shoppable": false,
//               "description": "The winter holidays just got a little warmer thanks to Fisher Nuts and these 2 show-stopping appetizers! ",
//               "approved_at": 1669911415,
//               "buzz_id": null,
//               "promotion": "full"
//             }
//           ],
//           "buzz_id": null,
//           "credits": [
//             {
//               "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/9f6df1667a954aaf83d677df76cb5fe0.png",
//               "name": "Fisher® Nuts",
//               "id": 67,
//               "type": "brand",
//               "slug": "fisher-r-nuts"
//             }
//           ],
//           "seo_title": "",
//           "keywords": "",
//           "servings_noun_singular": "tartlet"
//         }
//       ],
//       "name": "2 Simple, Beautiful Appetizers Starring Nuts",
//       "promotion": "full",
//       "aspect_ratio": "1:1",
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "created_at": 1667240384,
//       "country": "US",
//       "draft_status": "published",
//       "show_id": 17,
//       "approved_at": 1669911415,
//       "is_shoppable": false,
//       "tags": [
//         {
//           "id": 64481,
//           "display_name": "Appetizers",
//           "type": "meal",
//           "name": "appetizers"
//         },
//         {
//           "id": 8091748,
//           "display_name": "Under 1 Hour",
//           "type": "difficulty",
//           "name": "under_1_hour"
//         },
//         {
//           "name": "under_30_minutes",
//           "id": 64472,
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_45_minutes",
//           "id": 8091747,
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "vegetarian",
//           "id": 64469,
//           "display_name": "Vegetarian",
//           "type": "dietary"
//         },
//         {
//           "name": "christmas",
//           "id": 64473,
//           "display_name": "Christmas",
//           "type": "holiday"
//         }
//       ]
//     },
//     {
//       "promotion": "full",
//       "nutrition_visibility": "auto",
//       "country": "US",
//       "keywords": "",
//       "price": {
//         "total": 1650,
//         "updated_at": "2022-12-24T06:30:52+01:00",
//         "portion": 50,
//         "consumption_total": 700,
//         "consumption_portion": 50
//       },
//       "tips_and_ratings_enabled": true,
//       "renditions": [
//         {
//           "name": "mp4_720x720",
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/square_720/1667222967_00001.png",
//           "width": 720,
//           "minimum_bit_rate": null,
//           "content_type": "video/mp4",
//           "aspect": "square",
//           "maximum_bit_rate": null,
//           "height": 720,
//           "file_size": 37307912,
//           "url": "https://vid.tasty.co/output/260171/square_720/1667222967",
//           "duration": 169599,
//           "bit_rate": 1760
//         },
//         {
//           "file_size": 13235695,
//           "bit_rate": 625,
//           "aspect": "square",
//           "minimum_bit_rate": null,
//           "height": 320,
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/square_320/1667222967_00001.png",
//           "url": "https://vid.tasty.co/output/260171/square_320/1667222967",
//           "duration": 169599,
//           "content_type": "video/mp4",
//           "width": 320,
//           "name": "mp4_320x320"
//         },
//         {
//           "url": "https://vid.tasty.co/output/260171/landscape_720/1667222967",
//           "aspect": "square",
//           "width": 720,
//           "minimum_bit_rate": null,
//           "name": "mp4_720x720",
//           "maximum_bit_rate": null,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/landscape_720/1667222967_00001.png",
//           "file_size": 37303975,
//           "bit_rate": 1760,
//           "content_type": "video/mp4",
//           "height": 720,
//           "container": "mp4",
//           "duration": 169599
//         },
//         {
//           "url": "https://vid.tasty.co/output/260171/landscape_480/1667222967",
//           "content_type": "video/mp4",
//           "width": 480,
//           "height": 480,
//           "minimum_bit_rate": null,
//           "name": "mp4_480x480",
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/landscape_480/1667222967_00001.png",
//           "file_size": 21863964,
//           "duration": 169599,
//           "bit_rate": 1032,
//           "aspect": "square",
//           "maximum_bit_rate": null
//         },
//         {
//           "bit_rate": null,
//           "content_type": "application/vnd.apple.mpegurl",
//           "aspect": "square",
//           "width": 1080,
//           "name": "low",
//           "url": "https://vid.tasty.co/output/260171/hls24_1667222967.m3u8",
//           "duration": 169587,
//           "file_size": null,
//           "minimum_bit_rate": 272,
//           "maximum_bit_rate": 3114,
//           "height": 1080,
//           "container": "ts",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/1445289064805-h2exzu/1667222967_00001.png"
//         }
//       ],
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/a88338887a92494a9179c4700256a99d/FisherNuts_2SimpleBeautifulAppetizers_BFV96194_SQHero.mp4",
//       "video_id": 169505,
//       "prep_time_minutes": 10,
//       "video_url": "https://vid.tasty.co/output/260171/hls24_1667222967.m3u8",
//       "servings_noun_plural": "tartlets",
//       "total_time_tier": {
//         "tier": "under_30_minutes",
//         "display_tier": "Under 30 minutes"
//       },
//       "language": "eng",
//       "sections": [
//         {
//           "name": null,
//           "position": 1,
//           "components": [
//             {
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp"
//                   },
//                   "quantity": "3",
//                   "id": 716248
//                 }
//               ],
//               "raw_text": "3 tablespoons salted butter, melted, plus more for greasing",
//               "extra_comment": "melted, plus more for greasing",
//               "ingredient": {
//                 "updated_at": 1509035242,
//                 "name": "salted butter",
//                 "created_at": 1495587107,
//                 "display_plural": "salted butters",
//                 "id": 675,
//                 "display_singular": "salted butter"
//               },
//               "id": 97638,
//               "position": 1
//             },
//             {
//               "position": 2,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "225",
//                   "id": 716238
//                 },
//                 {
//                   "id": 716237,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "ounce",
//                     "display_plural": "oz",
//                     "display_singular": "oz",
//                     "abbreviation": "oz"
//                   },
//                   "quantity": "8"
//                 },
//                 {
//                   "unit": {
//                     "abbreviation": "roll",
//                     "system": "none",
//                     "name": "roll",
//                     "display_plural": "rolls",
//                     "display_singular": "roll"
//                   },
//                   "quantity": "1",
//                   "id": 716236
//                 }
//               ],
//               "raw_text": "1 8-ounce roll of phyllo dough, thawed",
//               "extra_comment": "thawed",
//               "ingredient": {
//                 "id": 678,
//                 "display_singular": "phyllo dough",
//                 "updated_at": 1509035241,
//                 "name": "phyllo dough",
//                 "created_at": 1495589321,
//                 "display_plural": "phyllo doughs"
//               },
//               "id": 97639
//             },
//             {
//               "measurements": [
//                 {
//                   "unit": {
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric"
//                   },
//                   "quantity": "170",
//                   "id": 716240
//                 },
//                 {
//                   "unit": {
//                     "display_singular": "oz",
//                     "abbreviation": "oz",
//                     "system": "imperial",
//                     "name": "ounce",
//                     "display_plural": "oz"
//                   },
//                   "quantity": "6",
//                   "id": 716239
//                 }
//               ],
//               "raw_text": "6 ounces Brie cheese, rind removed",
//               "extra_comment": "rind removed, cubed",
//               "ingredient": {
//                 "updated_at": 1509035277,
//                 "name": "brie cheese",
//                 "created_at": 1494296781,
//                 "display_plural": "brie cheeses",
//                 "id": 240,
//                 "display_singular": "brie cheese"
//               },
//               "id": 97640,
//               "position": 3
//             },
//             {
//               "ingredient": {
//                 "updated_at": 1667240519,
//                 "name": "Fisher® Walnut Halves and Pieces",
//                 "created_at": 1667240519,
//                 "display_plural": "Fisher® Walnut Halves and Pieces",
//                 "id": 10421,
//                 "display_singular": "Fisher® Walnut Halves and Piece"
//               },
//               "id": 97641,
//               "position": 4,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "g",
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g"
//                   },
//                   "quantity": "125",
//                   "id": 716245
//                 },
//                 {
//                   "unit": {
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c",
//                     "system": "imperial",
//                     "name": "cup"
//                   },
//                   "quantity": "1",
//                   "id": 716242
//                 }
//               ],
//               "raw_text": "1 cup Fisher® Walnut Halves and Pieces",
//               "extra_comment": ""
//             },
//             {
//               "raw_text": "1 Asian pear, cored and very thinly sliced",
//               "extra_comment": "cored and very thinly sliced",
//               "ingredient": {
//                 "created_at": 1620485502,
//                 "display_plural": "asian pears",
//                 "id": 8326,
//                 "display_singular": "asian pear",
//                 "updated_at": 1620485502,
//                 "name": "asian pear"
//               },
//               "id": 97642,
//               "position": 5,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": ""
//                   },
//                   "quantity": "1",
//                   "id": 716241
//                 }
//               ]
//             },
//             {
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon"
//                   },
//                   "quantity": "2",
//                   "id": 716247
//                 }
//               ],
//               "raw_text": "2 tablespoons honey",
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "honey",
//                 "created_at": 1493430363,
//                 "display_plural": "honeys",
//                 "id": 52,
//                 "display_singular": "honey",
//                 "updated_at": 1509035286
//               },
//               "id": 97643,
//               "position": 6
//             },
//             {
//               "raw_text": "2 teaspoons fresh thyme leaves",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_singular": "fresh thyme leaf",
//                 "updated_at": 1545064023,
//                 "name": "fresh thyme leaves",
//                 "created_at": 1545064023,
//                 "display_plural": "fresh thyme leaves",
//                 "id": 4999
//               },
//               "id": 97644,
//               "position": 7,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon"
//                   },
//                   "quantity": "2",
//                   "id": 716243
//                 }
//               ]
//             },
//             {
//               "measurements": [
//                 {
//                   "quantity": "35",
//                   "id": 716246,
//                   "unit": {
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric",
//                     "name": "gram"
//                   }
//                 },
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   },
//                   "quantity": "¼",
//                   "id": 716244
//                 }
//               ],
//               "raw_text": "¼ cup pomegranate seeds",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_singular": "pomegranate seed",
//                 "updated_at": 1521567629,
//                 "name": "pomegranate seeds",
//                 "created_at": 1496791018,
//                 "display_plural": "pomegranate seeds",
//                 "id": 1504
//               },
//               "id": 97645,
//               "position": 8
//             }
//           ]
//         }
//       ],
//       "compilations": [
//         {
//           "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/407908.jpg",
//           "buzz_id": null,
//           "aspect_ratio": "1:1",
//           "is_shoppable": false,
//           "show": [
//             {
//               "name": "Tasty",
//               "id": 17
//             }
//           ],
//           "description": "The winter holidays just got a little warmer thanks to Fisher Nuts and these 2 show-stopping appetizers! ",
//           "draft_status": "published",
//           "language": "eng",
//           "thumbnail_alt_text": "",
//           "country": "US",
//           "facebook_posts": [],
//           "beauty_url": null,
//           "video_id": 169505,
//           "created_at": 1667240384,
//           "approved_at": 1669911415,
//           "name": "2 Simple, Beautiful Appetizers Starring Nuts",
//           "canonical_id": "compilation:3357",
//           "id": 3357,
//           "slug": "2-simple-beautiful-appetizers-starring-nuts-fb",
//           "promotion": "full",
//           "keywords": null,
//           "video_url": "https://vid.tasty.co/output/260171/hls24_1667222967.m3u8"
//         }
//       ],
//       "aspect_ratio": "1:1",
//       "beauty_url": null,
//       "facebook_posts": [],
//       "user_ratings": {
//         "count_positive": 0,
//         "score": null,
//         "count_negative": 0
//       },
//       "brand_id": 67,
//       "nutrition": {},
//       "name": "Brie And Walnut Bites",
//       "yields": "Makes 24 tartlets",
//       "inspired_by_url": null,
//       "approved_at": 1669911402,
//       "instructions": [
//         {
//           "appliance": "oven",
//           "end_time": 0,
//           "temperature": 375,
//           "id": 73677,
//           "position": 1,
//           "display_text": "Preheat the oven to 375°F (190°C). Brush a 24-cup mini muffin tin with melted butter.",
//           "start_time": 0
//         },
//         {
//           "display_text": "Unroll the phyllo dough on a cutting board. Cut through the stack in a 5 x 3 grid to make 15 2½-inch squares per sheet. Any remaining dough scraps can be refrigerated or frozen for another use.",
//           "start_time": 7000,
//           "appliance": null,
//           "end_time": 13500,
//           "temperature": null,
//           "id": 73678,
//           "position": 2
//         },
//         {
//           "start_time": 16000,
//           "appliance": null,
//           "end_time": 28500,
//           "temperature": null,
//           "id": 73679,
//           "position": 3,
//           "display_text": "Gently press 2–3 sheets of phyllo dough into each muffin cup, then brush with melted butter. Repeat to make 2 more layers of dough, brushing with melted butter between."
//         },
//         {
//           "start_time": 35166,
//           "appliance": null,
//           "end_time": 64666,
//           "temperature": null,
//           "id": 73680,
//           "position": 4,
//           "display_text": "Reserve 24 of the larger Fisher® Walnut Halves and Pieces, then fill each phyllo cup with a cube of Brie, ½ teaspoon of the smaller walnuts, and a few small slices of pear. Place one of the reserved larger Fisher walnut halves on top of each cup. Drizzle each cup with about ¼ teaspoon of honey and sprinkle with thyme."
//         },
//         {
//           "end_time": 0,
//           "temperature": null,
//           "id": 73681,
//           "position": 5,
//           "display_text": "Bake the tartlets for 8–10 minutes, or until the phyllo cups are browned and the cheese is bubbly. Remove from the oven and let cool slightly before carefully removing the tartlets from the tin.",
//           "start_time": 0,
//           "appliance": null
//         },
//         {
//           "display_text": "Garnish each tartlet with 3 pomegranate seeds.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 73682,
//           "position": 6
//         },
//         {
//           "temperature": null,
//           "id": 73683,
//           "position": 7,
//           "display_text": "Serve warm.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0
//         },
//         {
//           "display_text": "Enjoy!",
//           "start_time": 71000,
//           "appliance": null,
//           "end_time": 73166,
//           "temperature": null,
//           "id": 73684,
//           "position": 8
//         }
//       ],
//       "slug": "brie-and-walnut-bites",
//       "tags": [
//         {
//           "type": "difficulty",
//           "name": "under_30_minutes",
//           "id": 64472,
//           "display_name": "Under 30 Minutes"
//         },
//         {
//           "name": "christmas",
//           "id": 64473,
//           "display_name": "Christmas",
//           "type": "holiday"
//         },
//         {
//           "id": 64481,
//           "display_name": "Appetizers",
//           "type": "meal",
//           "name": "appetizers"
//         },
//         {
//           "type": "difficulty",
//           "name": "under_45_minutes",
//           "id": 8091747,
//           "display_name": "Under 45 Minutes"
//         },
//         {
//           "display_name": "Under 1 Hour",
//           "type": "difficulty",
//           "name": "under_1_hour",
//           "id": 8091748
//         },
//         {
//           "name": "vegetarian",
//           "id": 64469,
//           "display_name": "Vegetarian",
//           "type": "dietary"
//         }
//       ],
//       "num_servings": 24,
//       "description": "",
//       "thumbnail_url": "https://s3.amazonaws.com/video-api-prod/assets/178ffbe048c748e9b2a68a0b0c32ef5b/brie.jpg",
//       "updated_at": 1669911403,
//       "cook_time_minutes": 10,
//       "id": 8527,
//       "buzz_id": null,
//       "draft_status": "published",
//       "thumbnail_alt_text": "",
//       "credits": [
//         {
//           "id": 67,
//           "type": "brand",
//           "slug": "fisher-r-nuts",
//           "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/9f6df1667a954aaf83d677df76cb5fe0.png",
//           "name": "Fisher® Nuts"
//         }
//       ],
//       "video_ad_content": "co_branded",
//       "seo_title": "",
//       "is_shoppable": false,
//       "brand": {
//         "name": "Fisher® Nuts",
//         "id": 67,
//         "slug": "fisher-r-nuts",
//         "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/9f6df1667a954aaf83d677df76cb5fe0.png"
//       },
//       "servings_noun_singular": "tartlet",
//       "show_id": 17,
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "created_at": 1667240360,
//       "total_time_minutes": 20,
//       "is_one_top": false,
//       "topics": [
//         {
//           "name": "Best Vegetarian",
//           "slug": "best-vegetarian"
//         },
//         {
//           "slug": "christmas",
//           "name": "Christmas"
//         }
//       ],
//       "canonical_id": "recipe:8527"
//     },
//     {
//       "language": "eng",
//       "buzz_id": null,
//       "draft_status": "published",
//       "updated_at": 1669911400,
//       "approved_at": 1669911399,
//       "nutrition_visibility": "auto",
//       "id": 8528,
//       "thumbnail_alt_text": "",
//       "is_one_top": false,
//       "canonical_id": "recipe:8528",
//       "cook_time_minutes": 15,
//       "facebook_posts": [],
//       "name": "Creamy Pecan-Stuffed Mushrooms",
//       "description": "",
//       "thumbnail_url": "https://s3.amazonaws.com/video-api-prod/assets/8e2264f6e8c949ed8e1c23bd7dceac70/mushroom.jpg",
//       "seo_title": "",
//       "promotion": "full",
//       "user_ratings": {
//         "count_positive": 1,
//         "score": 0.5,
//         "count_negative": 1
//       },
//       "price": {
//         "updated_at": "2022-12-24T06:30:52+01:00",
//         "portion": 500,
//         "consumption_total": 850,
//         "consumption_portion": 200,
//         "total": 2000
//       },
//       "servings_noun_singular": "serving",
//       "show_id": 17,
//       "created_at": 1667240384,
//       "renditions": [
//         {
//           "name": "mp4_720x720",
//           "maximum_bit_rate": null,
//           "file_size": 37307912,
//           "url": "https://vid.tasty.co/output/260171/square_720/1667222967",
//           "duration": 169599,
//           "bit_rate": 1760,
//           "width": 720,
//           "minimum_bit_rate": null,
//           "height": 720,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/square_720/1667222967_00001.png",
//           "content_type": "video/mp4",
//           "aspect": "square"
//         },
//         {
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/square_320/1667222967_00001.png",
//           "duration": 169599,
//           "bit_rate": 625,
//           "maximum_bit_rate": null,
//           "minimum_bit_rate": null,
//           "name": "mp4_320x320",
//           "height": 320,
//           "file_size": 13235695,
//           "url": "https://vid.tasty.co/output/260171/square_320/1667222967",
//           "content_type": "video/mp4",
//           "aspect": "square",
//           "width": 320
//         },
//         {
//           "url": "https://vid.tasty.co/output/260171/landscape_720/1667222967",
//           "duration": 169599,
//           "bit_rate": 1760,
//           "aspect": "square",
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/landscape_720/1667222967_00001.png",
//           "width": 720,
//           "minimum_bit_rate": null,
//           "name": "mp4_720x720",
//           "maximum_bit_rate": null,
//           "height": 720,
//           "file_size": 37303975,
//           "content_type": "video/mp4"
//         },
//         {
//           "bit_rate": 1032,
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "height": 480,
//           "container": "mp4",
//           "file_size": 21863964,
//           "duration": 169599,
//           "aspect": "square",
//           "width": 480,
//           "name": "mp4_480x480",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/landscape_480/1667222967_00001.png",
//           "url": "https://vid.tasty.co/output/260171/landscape_480/1667222967",
//           "content_type": "video/mp4"
//         },
//         {
//           "bit_rate": null,
//           "content_type": "application/vnd.apple.mpegurl",
//           "width": 1080,
//           "minimum_bit_rate": 272,
//           "maximum_bit_rate": 3114,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260171/1445289064805-h2exzu/1667222967_00001.png",
//           "url": "https://vid.tasty.co/output/260171/hls24_1667222967.m3u8",
//           "duration": 169587,
//           "aspect": "square",
//           "name": "low",
//           "height": 1080,
//           "container": "ts",
//           "file_size": null
//         }
//       ],
//       "slug": "creamy-pecan-stuffed-mushrooms",
//       "brand_id": 67,
//       "credits": [
//         {
//           "slug": "fisher-r-nuts",
//           "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/9f6df1667a954aaf83d677df76cb5fe0.png",
//           "name": "Fisher® Nuts",
//           "id": 67,
//           "type": "brand"
//         }
//       ],
//       "instructions": [
//         {
//           "id": 73685,
//           "position": 1,
//           "display_text": "Preheat the oven to 375°F (190°C). Line a baking sheet with parchment paper.",
//           "start_time": 0,
//           "appliance": "oven",
//           "end_time": 0,
//           "temperature": 400
//         },
//         {
//           "temperature": null,
//           "id": 73686,
//           "position": 2,
//           "display_text": "Remove stems from the mushrooms and reserve for the filling. Arrange the mushroom caps, stem-side up, on the prepared baking sheet. Brush with the olive oil and season with salt to taste.",
//           "start_time": 74000,
//           "appliance": null,
//           "end_time": 89333
//         },
//         {
//           "id": 73687,
//           "position": 3,
//           "display_text": "Make the filling: Finely chop the mushroom stems, then add to a medium skillet with the butter and garlic. Cook over medium heat for about 5 minutes, or until the mushrooms and garlic have softened and browned slightly. Remove the pan from the heat.",
//           "start_time": 90666,
//           "appliance": null,
//           "end_time": 114166,
//           "temperature": null
//         },
//         {
//           "id": 73688,
//           "position": 4,
//           "display_text": "Add 2 tablespoons of Fisher® Chopped Pecans, the onion powder, ¼ teaspoon salt, the pepper, and soy sauce to the skillet and stir to combine.",
//           "start_time": 116000,
//           "appliance": null,
//           "end_time": 129833,
//           "temperature": null
//         },
//         {
//           "end_time": 138833,
//           "temperature": null,
//           "id": 73689,
//           "position": 5,
//           "display_text": "While the pan is still warm, but not hot, add the cream cheese, Parmesan, and thyme and stir until the mixture is smooth.",
//           "start_time": 132000,
//           "appliance": null
//         },
//         {
//           "id": 73690,
//           "position": 6,
//           "display_text": "Carefully fill each mushroom cap with the filling. Sprinkle the remaining 2 tablespoons of Fisher® Chopped Pecans and the panko bread crumbs on top of the mushrooms.",
//           "start_time": 142000,
//           "appliance": null,
//           "end_time": 155833,
//           "temperature": null
//         },
//         {
//           "end_time": 0,
//           "temperature": null,
//           "id": 73691,
//           "position": 7,
//           "display_text": "Bake for 15 minutes, or until the mushrooms are tender and the topping has browned slightly.",
//           "start_time": 0,
//           "appliance": null
//         },
//         {
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 73692,
//           "position": 8,
//           "display_text": "Serve warm."
//         },
//         {
//           "start_time": 160000,
//           "appliance": null,
//           "end_time": 163166,
//           "temperature": null,
//           "id": 73693,
//           "position": 9,
//           "display_text": "Enjoy!"
//         }
//       ],
//       "compilations": [
//         {
//           "aspect_ratio": "1:1",
//           "country": "US",
//           "description": "The winter holidays just got a little warmer thanks to Fisher Nuts and these 2 show-stopping appetizers! ",
//           "draft_status": "published",
//           "approved_at": 1669911415,
//           "created_at": 1667240384,
//           "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/407908.jpg",
//           "slug": "2-simple-beautiful-appetizers-starring-nuts-fb",
//           "id": 3357,
//           "buzz_id": null,
//           "keywords": null,
//           "facebook_posts": [],
//           "show": [
//             {
//               "name": "Tasty",
//               "id": 17
//             }
//           ],
//           "thumbnail_alt_text": "",
//           "video_url": "https://vid.tasty.co/output/260171/hls24_1667222967.m3u8",
//           "canonical_id": "compilation:3357",
//           "promotion": "full",
//           "is_shoppable": false,
//           "language": "eng",
//           "name": "2 Simple, Beautiful Appetizers Starring Nuts",
//           "beauty_url": null,
//           "video_id": 169505
//         }
//       ],
//       "tips_and_ratings_enabled": true,
//       "show": {
//         "id": 17,
//         "name": "Tasty"
//       },
//       "is_shoppable": false,
//       "topics": [
//         {
//           "name": "Best Vegetarian",
//           "slug": "best-vegetarian"
//         },
//         {
//           "name": "Bread Lovers",
//           "slug": "bread"
//         },
//         {
//           "name": "Christmas",
//           "slug": "christmas"
//         },
//         {
//           "name": "Romantic Dinners",
//           "slug": "romantic-dinners"
//         },
//         {
//           "name": "Thanksgiving",
//           "slug": "thanksgiving"
//         }
//       ],
//       "video_ad_content": "co_branded",
//       "video_id": 169505,
//       "country": "US",
//       "keywords": "",
//       "brand": {
//         "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/9f6df1667a954aaf83d677df76cb5fe0.png",
//         "name": "Fisher® Nuts",
//         "id": 67,
//         "slug": "fisher-r-nuts"
//       },
//       "tags": [
//         {
//           "name": "appetizers",
//           "id": 64481,
//           "display_name": "Appetizers",
//           "type": "meal"
//         },
//         {
//           "id": 64472,
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty",
//           "name": "under_30_minutes"
//         },
//         {
//           "name": "christmas",
//           "id": 64473,
//           "display_name": "Christmas",
//           "type": "holiday"
//         },
//         {
//           "name": "under_45_minutes",
//           "id": 8091747,
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_1_hour",
//           "id": 8091748,
//           "display_name": "Under 1 Hour",
//           "type": "difficulty"
//         },
//         {
//           "name": "vegetarian",
//           "id": 64469,
//           "display_name": "Vegetarian",
//           "type": "dietary"
//         },
//         {
//           "display_name": "Thanksgiving",
//           "type": "holiday",
//           "name": "thanksgiving",
//           "id": 64479
//         },
//         {
//           "name": "bake",
//           "id": 64492,
//           "display_name": "Bake",
//           "type": "cooking_style"
//         },
//         {
//           "name": "oven",
//           "id": 65846,
//           "display_name": "Oven",
//           "type": "appliance"
//         },
//         {
//           "type": "occasion",
//           "name": "casual_party",
//           "id": 64503,
//           "display_name": "Casual Party"
//         },
//         {
//           "id": 188967,
//           "display_name": "Special Occasion",
//           "type": "occasion",
//           "name": "special_occasion"
//         }
//       ],
//       "nutrition": {},
//       "num_servings": 4,
//       "video_url": "https://vid.tasty.co/output/260171/hls24_1667222967.m3u8",
//       "servings_noun_plural": "servings",
//       "prep_time_minutes": 10,
//       "sections": [
//         {
//           "components": [
//             {
//               "id": 97646,
//               "position": 1,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric",
//                     "name": "gram"
//                   },
//                   "quantity": "450",
//                   "id": 716250
//                 },
//                 {
//                   "unit": {
//                     "name": "ounce",
//                     "display_plural": "oz",
//                     "display_singular": "oz",
//                     "abbreviation": "oz",
//                     "system": "imperial"
//                   },
//                   "quantity": "16",
//                   "id": 716249
//                 }
//               ],
//               "raw_text": "16 ounces cremini mushrooms",
//               "extra_comment": "",
//               "ingredient": {
//                 "created_at": 1636638692,
//                 "display_plural": "cremini mushrooms",
//                 "id": 9326,
//                 "display_singular": "cremini mushroom",
//                 "updated_at": 1636638692,
//                 "name": "cremini mushrooms"
//               }
//             },
//             {
//               "raw_text": "2 teaspoons olive oil",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035290,
//                 "name": "olive oil",
//                 "created_at": 1493306183,
//                 "display_plural": "olive oils",
//                 "id": 4,
//                 "display_singular": "olive oil"
//               },
//               "id": 97647,
//               "position": 2,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   },
//                   "quantity": "2",
//                   "id": 716261
//                 }
//               ]
//             },
//             {
//               "extra_comment": "plus more to taste",
//               "ingredient": {
//                 "created_at": 1493307153,
//                 "display_plural": "kosher salts",
//                 "id": 11,
//                 "display_singular": "kosher salt",
//                 "updated_at": 1509035289,
//                 "name": "kosher salt"
//               },
//               "id": 97648,
//               "position": 3,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   },
//                   "quantity": "¼",
//                   "id": 716256
//                 }
//               ],
//               "raw_text": "¼ teaspoon kosher salt, plus more to taste"
//             },
//             {
//               "extra_comment": "",
//               "ingredient": {
//                 "display_plural": "unsalted butters",
//                 "id": 291,
//                 "display_singular": "unsalted butter",
//                 "updated_at": 1509035272,
//                 "name": "unsalted butter",
//                 "created_at": 1494806355
//               },
//               "id": 97649,
//               "position": 4,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp"
//                   },
//                   "quantity": "1",
//                   "id": 716260
//                 }
//               ],
//               "raw_text": "1 tablespoon unsalted butter"
//             },
//             {
//               "extra_comment": "minced",
//               "ingredient": {
//                 "id": 10426,
//                 "display_singular": "small garlic clove",
//                 "updated_at": 1667252783,
//                 "name": "small garlic clove",
//                 "created_at": 1667252783,
//                 "display_plural": "small garlic cloves"
//               },
//               "id": 97650,
//               "position": 5,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": "",
//                     "display_plural": ""
//                   },
//                   "quantity": "1",
//                   "id": 716254
//                 }
//               ],
//               "raw_text": "1 small clove of garlic, minced"
//             },
//             {
//               "position": 6,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon"
//                   },
//                   "quantity": "4",
//                   "id": 716252
//                 }
//               ],
//               "raw_text": "4 tablespoons Fisher® Chopped Pecans, divided",
//               "extra_comment": "divided",
//               "ingredient": {
//                 "created_at": 1667240700,
//                 "display_plural": "Fisher® Chopped Pecans",
//                 "id": 10422,
//                 "display_singular": "Fisher® Chopped Pecan",
//                 "updated_at": 1667240700,
//                 "name": "Fisher® Chopped Pecans"
//               },
//               "id": 97651
//             },
//             {
//               "extra_comment": "",
//               "ingredient": {
//                 "display_plural": "onion powders",
//                 "id": 8,
//                 "display_singular": "onion powder",
//                 "updated_at": 1509035289,
//                 "name": "onion powder",
//                 "created_at": 1493307116
//               },
//               "id": 97652,
//               "position": 7,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp",
//                     "system": "imperial",
//                     "name": "teaspoon"
//                   },
//                   "quantity": "¼",
//                   "id": 716253
//                 }
//               ],
//               "raw_text": "¼ teaspoon onion powder"
//             },
//             {
//               "id": 97653,
//               "position": 8,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp",
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons"
//                   },
//                   "quantity": "¼",
//                   "id": 716255
//                 }
//               ],
//               "raw_text": "¼ teaspoon freshly ground black pepper",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035282,
//                 "name": "freshly ground black pepper",
//                 "created_at": 1493925438,
//                 "display_plural": "freshly ground black peppers",
//                 "id": 166,
//                 "display_singular": "freshly ground black pepper"
//               }
//             },
//             {
//               "raw_text": "1 teaspoon soy sauce",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035287,
//                 "name": "soy sauce",
//                 "created_at": 1493314932,
//                 "display_plural": "soy sauces",
//                 "id": 28,
//                 "display_singular": "soy sauce"
//               },
//               "id": 97654,
//               "position": 9,
//               "measurements": [
//                 {
//                   "id": 716251,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   },
//                   "quantity": "1"
//                 }
//               ]
//             },
//             {
//               "raw_text": "4 ounces cream cheese",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_singular": "cream cheese",
//                 "updated_at": 1509035276,
//                 "name": "cream cheese",
//                 "created_at": 1494297000,
//                 "display_plural": "cream cheeses",
//                 "id": 242
//               },
//               "id": 97656,
//               "position": 10,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric",
//                     "name": "gram"
//                   },
//                   "quantity": "115",
//                   "id": 716258
//                 },
//                 {
//                   "unit": {
//                     "name": "ounce",
//                     "display_plural": "oz",
//                     "display_singular": "oz",
//                     "abbreviation": "oz",
//                     "system": "imperial"
//                   },
//                   "quantity": "4",
//                   "id": 716257
//                 }
//               ]
//             },
//             {
//               "raw_text": "¼ cup finely grated Parmesan cheese",
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "finely grated parmesan cheese",
//                 "created_at": 1501634138,
//                 "display_plural": "finely grated parmesan cheeses",
//                 "id": 2785,
//                 "display_singular": "finely grated parmesan cheese",
//                 "updated_at": 1509035109
//               },
//               "id": 97657,
//               "position": 11,
//               "measurements": [
//                 {
//                   "id": 716263,
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "30"
//                 },
//                 {
//                   "unit": {
//                     "display_singular": "cup",
//                     "abbreviation": "c",
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups"
//                   },
//                   "quantity": "¼",
//                   "id": 716262
//                 }
//               ]
//             },
//             {
//               "raw_text": "¼ teaspoon fresh thyme leaves, plus more for garnish",
//               "extra_comment": "plus more for garnish",
//               "ingredient": {
//                 "updated_at": 1545064023,
//                 "name": "fresh thyme leaves",
//                 "created_at": 1545064023,
//                 "display_plural": "fresh thyme leaves",
//                 "id": 4999,
//                 "display_singular": "fresh thyme leaf"
//               },
//               "id": 97655,
//               "position": 12,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp",
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons"
//                   },
//                   "quantity": "¼",
//                   "id": 716264
//                 }
//               ]
//             },
//             {
//               "extra_comment": "",
//               "ingredient": {
//                 "display_singular": "panko bread crumb",
//                 "updated_at": 1509035128,
//                 "name": "panko bread crumbs",
//                 "created_at": 1500680486,
//                 "display_plural": "panko bread crumbs",
//                 "id": 2438
//               },
//               "id": 97658,
//               "position": 13,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons"
//                   },
//                   "quantity": "2",
//                   "id": 716259
//                 }
//               ],
//               "raw_text": "2 tablespoons panko bread crumbs"
//             }
//           ],
//           "name": null,
//           "position": 1
//         }
//       ],
//       "aspect_ratio": "1:1",
//       "inspired_by_url": null,
//       "total_time_minutes": 25,
//       "beauty_url": null,
//       "total_time_tier": {
//         "tier": "under_30_minutes",
//         "display_tier": "Under 30 minutes"
//       },
//       "yields": "Servings: 4",
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/a88338887a92494a9179c4700256a99d/FisherNuts_2SimpleBeautifulAppetizers_BFV96194_SQHero.mp4"
//     },
//     {
//       "price": {
//         "portion": 300,
//         "consumption_total": 450,
//         "consumption_portion": 100,
//         "total": 1650,
//         "updated_at": "2022-12-24T06:30:55+01:00"
//       },
//       "nutrition": {
//         "fiber": 1,
//         "updated_at": "2022-11-29T07:01:16+01:00",
//         "protein": 6,
//         "fat": 2,
//         "calories": 153,
//         "sugar": 2,
//         "carbohydrates": 27
//       },
//       "tips_and_ratings_enabled": true,
//       "topics": [
//         {
//           "name": "5 Ingredients or Less",
//           "slug": "5-ingredients-or-less"
//         },
//         {
//           "name": "Best Vegetarian",
//           "slug": "best-vegetarian"
//         },
//         {
//           "name": "Bread Lovers",
//           "slug": "bread"
//         },
//         {
//           "name": "Romantic Dinners",
//           "slug": "romantic-dinners"
//         },
//         {
//           "name": "American",
//           "slug": "american"
//         },
//         {
//           "name": "Italian",
//           "slug": "italian"
//         }
//       ],
//       "video_id": 172839,
//       "is_shoppable": true,
//       "cook_time_minutes": null,
//       "slug": "cowboy-butter-garlic-bread",
//       "sections": [
//         {
//           "components": [
//             {
//               "position": 1,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   },
//                   "quantity": "1",
//                   "id": 715739
//                 },
//                 {
//                   "id": 715738,
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "230"
//                 },
//                 {
//                   "unit": {
//                     "abbreviation": "stick",
//                     "system": "none",
//                     "name": "stick",
//                     "display_plural": "sticks",
//                     "display_singular": "stick"
//                   },
//                   "quantity": "2",
//                   "id": 715737
//                 }
//               ],
//               "raw_text": "1 cup (2 sticks) unsalted butter, melted",
//               "extra_comment": "melted",
//               "ingredient": {
//                 "display_singular": "unsalted butter",
//                 "updated_at": 1509035272,
//                 "name": "unsalted butter",
//                 "created_at": 1494806355,
//                 "display_plural": "unsalted butters",
//                 "id": 291
//               },
//               "id": 97905
//             },
//             {
//               "raw_text": "1 tablespoon Dijon mustard",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035271,
//                 "name": "dijon mustard",
//                 "created_at": 1494812213,
//                 "display_plural": "dijon mustards",
//                 "id": 307,
//                 "display_singular": "dijon mustard"
//               },
//               "id": 97906,
//               "position": 2,
//               "measurements": [
//                 {
//                   "id": 715727,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp"
//                   },
//                   "quantity": "1"
//                 }
//               ]
//             },
//             {
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "paprika",
//                 "created_at": 1493430149,
//                 "display_plural": "paprikas",
//                 "id": 42,
//                 "display_singular": "paprika",
//                 "updated_at": 1509035286
//               },
//               "id": 97907,
//               "position": 3,
//               "measurements": [
//                 {
//                   "id": 715724,
//                   "unit": {
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp",
//                     "system": "imperial",
//                     "name": "teaspoon"
//                   },
//                   "quantity": "1"
//                 }
//               ],
//               "raw_text": "1 teaspoon paprika"
//             },
//             {
//               "id": 97908,
//               "position": 4,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   },
//                   "quantity": "½",
//                   "id": 715736
//                 }
//               ],
//               "raw_text": "½ teaspoon cayenne",
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "cayenne pepper",
//                 "created_at": 1493307142,
//                 "display_plural": "cayenne peppers",
//                 "id": 10,
//                 "display_singular": "cayenne pepper",
//                 "updated_at": 1509035289
//               }
//             },
//             {
//               "id": 97909,
//               "position": 5,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   },
//                   "quantity": "1",
//                   "id": 715734
//                 }
//               ],
//               "raw_text": "1 teaspoon red pepper flakes",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_singular": "red pepper flake",
//                 "updated_at": 1509035267,
//                 "name": "red pepper flakes",
//                 "created_at": 1494885083,
//                 "display_plural": "red pepper flakes",
//                 "id": 351
//               }
//             },
//             {
//               "position": 6,
//               "measurements": [
//                 {
//                   "quantity": "0",
//                   "id": 715723,
//                   "unit": {
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": ""
//                   }
//                 }
//               ],
//               "raw_text": "Kosher salt, to taste",
//               "extra_comment": "to taste",
//               "ingredient": {
//                 "id": 11,
//                 "display_singular": "kosher salt",
//                 "updated_at": 1509035289,
//                 "name": "kosher salt",
//                 "created_at": 1493307153,
//                 "display_plural": "kosher salts"
//               },
//               "id": 97910
//             },
//             {
//               "raw_text": "Freshly ground black pepper, to taste",
//               "extra_comment": "to taste",
//               "ingredient": {
//                 "id": 166,
//                 "display_singular": "freshly ground black pepper",
//                 "updated_at": 1509035282,
//                 "name": "freshly ground black pepper",
//                 "created_at": 1493925438,
//                 "display_plural": "freshly ground black peppers"
//               },
//               "id": 97911,
//               "position": 7,
//               "measurements": [
//                 {
//                   "id": 715732,
//                   "unit": {
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none"
//                   },
//                   "quantity": "0"
//                 }
//               ]
//             },
//             {
//               "id": 97912,
//               "position": 8,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": ""
//                   },
//                   "quantity": "1",
//                   "id": 715735
//                 }
//               ],
//               "raw_text": "Zest of 1 lemon",
//               "extra_comment": "zested",
//               "ingredient": {
//                 "display_plural": "lemons",
//                 "id": 155,
//                 "display_singular": "lemon",
//                 "updated_at": 1509035282,
//                 "name": "lemon",
//                 "created_at": 1493906426
//               }
//             },
//             {
//               "raw_text": "Juice of ½ lemon",
//               "extra_comment": "juiced",
//               "ingredient": {
//                 "created_at": 1493906426,
//                 "display_plural": "lemons",
//                 "id": 155,
//                 "display_singular": "lemon",
//                 "updated_at": 1509035282,
//                 "name": "lemon"
//               },
//               "id": 97913,
//               "position": 9,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": ""
//                   },
//                   "quantity": "½",
//                   "id": 715731
//                 }
//               ]
//             },
//             {
//               "extra_comment": "",
//               "ingredient": {
//                 "created_at": 1538083491,
//                 "display_plural": "chopped fresh chives",
//                 "id": 4736,
//                 "display_singular": "chopped fresh chive",
//                 "updated_at": 1538083491,
//                 "name": "chopped fresh chives"
//               },
//               "id": 97914,
//               "position": 10,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon"
//                   },
//                   "quantity": "1",
//                   "id": 715726
//                 }
//               ],
//               "raw_text": "1 tablespoon chopped fresh chives"
//             },
//             {
//               "raw_text": "1 teaspoon fresh thyme leaves",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1545064023,
//                 "name": "fresh thyme leaves",
//                 "created_at": 1545064023,
//                 "display_plural": "fresh thyme leaves",
//                 "id": 4999,
//                 "display_singular": "fresh thyme leaf"
//               },
//               "id": 97915,
//               "position": 11,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp",
//                     "system": "imperial",
//                     "name": "teaspoon"
//                   },
//                   "quantity": "1",
//                   "id": 715733
//                 }
//               ]
//             },
//             {
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon"
//                   },
//                   "quantity": "2",
//                   "id": 715725
//                 }
//               ],
//               "raw_text": "2 tablespoons chopped fresh parsley, plus more for garnish",
//               "extra_comment": "plus more for garnish",
//               "ingredient": {
//                 "display_plural": "Chopped fresh parsleys",
//                 "id": 3893,
//                 "display_singular": "Chopped fresh parsley",
//                 "updated_at": 1521754417,
//                 "name": "Chopped fresh parsley",
//                 "created_at": 1521754417
//               },
//               "id": 97916,
//               "position": 12
//             },
//             {
//               "id": 97917,
//               "position": 13,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "clove",
//                     "display_plural": "cloves",
//                     "display_singular": "clove",
//                     "abbreviation": "clove"
//                   },
//                   "quantity": "4",
//                   "id": 715729
//                 }
//               ],
//               "raw_text": "4 garlic cloves, minced",
//               "extra_comment": "minced",
//               "ingredient": {
//                 "display_plural": "garlics",
//                 "id": 95,
//                 "display_singular": "garlic",
//                 "updated_at": 1509035285,
//                 "name": "garlic",
//                 "created_at": 1493744766
//               }
//             },
//             {
//               "raw_text": "1 baguette, halved lengthwise",
//               "extra_comment": "halved lengthwise",
//               "ingredient": {
//                 "id": 753,
//                 "display_singular": "baguette",
//                 "updated_at": 1509035236,
//                 "name": "baguette",
//                 "created_at": 1495687137,
//                 "display_plural": "baguettes"
//               },
//               "id": 97918,
//               "position": 14,
//               "measurements": [
//                 {
//                   "id": 715730,
//                   "unit": {
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": "",
//                     "display_plural": ""
//                   },
//                   "quantity": "1"
//                 }
//               ]
//             },
//             {
//               "ingredient": {
//                 "created_at": 1493743835,
//                 "display_plural": "parmesan cheeses",
//                 "id": 82,
//                 "display_singular": "parmesan cheese",
//                 "updated_at": 1509035285,
//                 "name": "parmesan cheese"
//               },
//               "id": 97919,
//               "position": 15,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "wedge",
//                     "display_plural": "wedges",
//                     "display_singular": "wedge",
//                     "abbreviation": "wedge"
//                   },
//                   "quantity": "1",
//                   "id": 715728
//                 }
//               ],
//               "raw_text": "Wedge of Parmesan cheese, for grating",
//               "extra_comment": "for grating"
//             }
//           ],
//           "name": null,
//           "position": 1
//         }
//       ],
//       "brand_id": null,
//       "draft_status": "published",
//       "thumbnail_alt_text": "",
//       "renditions": [
//         {
//           "aspect": "portrait",
//           "width": 404,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262487/square_720/1668790605_00001.png",
//           "file_size": 3842494,
//           "duration": 14722,
//           "bit_rate": 2089,
//           "content_type": "video/mp4",
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "height": 720,
//           "url": "https://vid.tasty.co/output/262487/square_720/1668790605",
//           "name": "mp4_404x720"
//         },
//         {
//           "duration": 14722,
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262487/square_320/1668790605_00001.png",
//           "url": "https://vid.tasty.co/output/262487/square_320/1668790605",
//           "bit_rate": 710,
//           "width": 180,
//           "name": "mp4_180x320",
//           "maximum_bit_rate": null,
//           "height": 320,
//           "container": "mp4",
//           "file_size": 1305346
//         },
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262487/landscape_720/1668790605_00001.png",
//           "duration": 14722,
//           "aspect": "portrait",
//           "width": 404,
//           "minimum_bit_rate": null,
//           "name": "mp4_404x720",
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "file_size": 3826741,
//           "url": "https://vid.tasty.co/output/262487/landscape_720/1668790605",
//           "bit_rate": 2080,
//           "content_type": "video/mp4",
//           "height": 720
//         },
//         {
//           "aspect": "portrait",
//           "name": "mp4_270x480",
//           "maximum_bit_rate": null,
//           "height": 480,
//           "url": "https://vid.tasty.co/output/262487/landscape_480/1668790605",
//           "bit_rate": 1193,
//           "file_size": 2194962,
//           "duration": 14722,
//           "content_type": "video/mp4",
//           "width": 270,
//           "minimum_bit_rate": null,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262487/landscape_480/1668790605_00001.png"
//         },
//         {
//           "minimum_bit_rate": 276,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262487/1445289064805-h2exzu/1668790605_00001.png",
//           "file_size": null,
//           "duration": 14727,
//           "content_type": "application/vnd.apple.mpegurl",
//           "aspect": "portrait",
//           "maximum_bit_rate": 3406,
//           "height": 1080,
//           "container": "ts",
//           "url": "https://vid.tasty.co/output/262487/hls24_1668790605.m3u8",
//           "bit_rate": null,
//           "width": 606,
//           "name": "low"
//         }
//       ],
//       "promotion": "full",
//       "approved_at": 1669673528,
//       "country": "US",
//       "keywords": "",
//       "user_ratings": {
//         "count_positive": 18,
//         "score": 0.75,
//         "count_negative": 6
//       },
//       "servings_noun_singular": "serving",
//       "description": "Skip the basic garlic bread and try this spicy, zesty version made with flavorful cowboy butter and loads of Parmesan cheese!",
//       "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/411554.jpg",
//       "compilations": [],
//       "buzz_id": null,
//       "updated_at": 1669673529,
//       "credits": [
//         {
//           "name": "Bella Lopez",
//           "type": "internal"
//         }
//       ],
//       "beauty_url": null,
//       "seo_title": "",
//       "language": "eng",
//       "name": "Cowboy Butter Garlic Bread",
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "is_one_top": false,
//       "yields": "Servings: 4–6",
//       "servings_noun_plural": "servings",
//       "total_time_tier": {
//         "tier": "under_15_minutes",
//         "display_tier": "Under 15 minutes"
//       },
//       "nutrition_visibility": "auto",
//       "instructions": [
//         {
//           "id": 73864,
//           "position": 1,
//           "display_text": "Turn the broiler on high. Line a baking sheet with parchment paper.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null
//         },
//         {
//           "start_time": 2000,
//           "appliance": null,
//           "end_time": 6833,
//           "temperature": null,
//           "id": 73865,
//           "position": 2,
//           "display_text": "In a small bowl, mix together the melted butter, Dijon mustard, paprika, cayenne, red pepper flakes, salt, black pepper, lemon zest and juice, chives, thyme, parsley, and garlic until well-combined."
//         },
//         {
//           "start_time": 7333,
//           "appliance": null,
//           "end_time": 9166,
//           "temperature": null,
//           "id": 73866,
//           "position": 3,
//           "display_text": "Brush the butter mixture over both halves of the baguette. Generously grate Parmesan cheese over the bread. Transfer the baguette halves to the prepared baking sheet."
//         },
//         {
//           "temperature": null,
//           "id": 73867,
//           "position": 4,
//           "display_text": "Broil the bread for 2–3 minutes, or until the cheese is melted and golden brown.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0
//         },
//         {
//           "start_time": 10666,
//           "appliance": null,
//           "end_time": 12666,
//           "temperature": null,
//           "id": 73868,
//           "position": 5,
//           "display_text": "Slice the bread crosswise into pieces and garnish with more parsley. Serve warm."
//         },
//         {
//           "position": 6,
//           "display_text": "Enjoy!",
//           "start_time": 13166,
//           "appliance": null,
//           "end_time": 13633,
//           "temperature": null,
//           "id": 73869
//         }
//       ],
//       "facebook_posts": [],
//       "brand": null,
//       "inspired_by_url": null,
//       "total_time_minutes": 13,
//       "video_ad_content": "none",
//       "canonical_id": "recipe:8550",
//       "id": 8550,
//       "tags": [
//         {
//           "display_name": "Under 1 Hour",
//           "type": "difficulty",
//           "name": "under_1_hour",
//           "id": 8091748
//         },
//         {
//           "name": "under_45_minutes",
//           "id": 8091747,
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "appetizers",
//           "id": 64481,
//           "display_name": "Appetizers",
//           "type": "meal"
//         },
//         {
//           "name": "5_ingredients_or_less",
//           "id": 64470,
//           "display_name": "5 Ingredients or Less",
//           "type": "difficulty"
//         },
//         {
//           "display_name": "Sides",
//           "type": "meal",
//           "name": "sides",
//           "id": 64490
//         },
//         {
//           "name": "oven",
//           "id": 65846,
//           "display_name": "Oven",
//           "type": "appliance"
//         },
//         {
//           "id": 64472,
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty",
//           "name": "under_30_minutes"
//         },
//         {
//           "id": 64462,
//           "display_name": "Comfort Food",
//           "type": "cooking_style",
//           "name": "comfort_food"
//         },
//         {
//           "name": "american",
//           "id": 64444,
//           "display_name": "American",
//           "type": "cuisine"
//         },
//         {
//           "name": "italian",
//           "id": 64453,
//           "display_name": "Italian",
//           "type": "cuisine"
//         },
//         {
//           "name": "low_sugar",
//           "id": 8091918,
//           "display_name": "Low-Sugar",
//           "type": "healthy"
//         },
//         {
//           "id": 8091744,
//           "display_name": "Under 15 Minutes",
//           "type": "difficulty",
//           "name": "under_15_minutes"
//         },
//         {
//           "name": "vegetarian",
//           "id": 64469,
//           "display_name": "Vegetarian",
//           "type": "dietary"
//         }
//       ],
//       "num_servings": 6,
//       "created_at": 1668790708,
//       "video_url": "https://vid.tasty.co/output/262487/hls24_1668790605.m3u8",
//       "show_id": 17,
//       "prep_time_minutes": null,
//       "aspect_ratio": "1:1",
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/f781cc92ec8a4b02a33716ffe34cc767/Cowboybuttergarlicbread.mp4"
//     },
//     {
//       "nutrition_visibility": "auto",
//       "aspect_ratio": "1:1",
//       "updated_at": 1669672732,
//       "tags": [
//         {
//           "name": "5_ingredients_or_less",
//           "id": 64470,
//           "display_name": "5 Ingredients or Less",
//           "type": "difficulty"
//         },
//         {
//           "type": "difficulty",
//           "name": "under_45_minutes",
//           "id": 8091747,
//           "display_name": "Under 45 Minutes"
//         },
//         {
//           "name": "easy",
//           "id": 64471,
//           "display_name": "Easy",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_1_hour",
//           "id": 8091748,
//           "display_name": "Under 1 Hour",
//           "type": "difficulty"
//         },
//         {
//           "name": "breakfast",
//           "id": 64483,
//           "display_name": "Breakfast",
//           "type": "meal"
//         },
//         {
//           "display_name": "American",
//           "type": "cuisine",
//           "name": "american",
//           "id": 64444
//         },
//         {
//           "name": "stove_top",
//           "id": 65848,
//           "display_name": "Stove Top",
//           "type": "appliance"
//         },
//         {
//           "id": 64493,
//           "display_name": "Deep-Fry",
//           "type": "cooking_style",
//           "name": "deep_fry"
//         },
//         {
//           "name": "under_30_minutes",
//           "id": 64472,
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "vegetarian",
//           "id": 64469,
//           "display_name": "Vegetarian",
//           "type": "dietary"
//         }
//       ],
//       "draft_status": "published",
//       "inspired_by_url": null,
//       "country": "US",
//       "price": {
//         "total": 3200,
//         "updated_at": "2022-12-24T06:30:55+01:00",
//         "portion": 1600,
//         "consumption_total": 2450,
//         "consumption_portion": 1200
//       },
//       "brand": null,
//       "show_id": 17,
//       "prep_time_minutes": 15,
//       "is_one_top": false,
//       "video_ad_content": "none",
//       "seo_title": "",
//       "renditions": [
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262322/square_720/1668708299_00001.png",
//           "file_size": 8421082,
//           "url": "https://vid.tasty.co/output/262322/square_720/1668708299",
//           "bit_rate": 2215,
//           "width": 404,
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "name": "mp4_404x720",
//           "height": 720,
//           "duration": 30419
//         },
//         {
//           "url": "https://vid.tasty.co/output/262322/square_320/1668708299",
//           "duration": 30419,
//           "bit_rate": 750,
//           "content_type": "video/mp4",
//           "width": 180,
//           "maximum_bit_rate": null,
//           "file_size": 2851184,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262322/square_320/1668708299_00001.png",
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "name": "mp4_180x320",
//           "height": 320,
//           "container": "mp4"
//         },
//         {
//           "maximum_bit_rate": null,
//           "height": 720,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262322/landscape_720/1668708299_00001.png",
//           "file_size": 8426769,
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "name": "mp4_404x720",
//           "url": "https://vid.tasty.co/output/262322/landscape_720/1668708299",
//           "duration": 30419,
//           "bit_rate": 2217,
//           "width": 404,
//           "minimum_bit_rate": null
//         },
//         {
//           "file_size": 4866817,
//           "url": "https://vid.tasty.co/output/262322/landscape_480/1668708299",
//           "duration": 30419,
//           "content_type": "video/mp4",
//           "width": 270,
//           "name": "mp4_270x480",
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262322/landscape_480/1668708299_00001.png",
//           "bit_rate": 1280,
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "height": 480
//         },
//         {
//           "container": "ts",
//           "duration": 30451,
//           "content_type": "application/vnd.apple.mpegurl",
//           "width": 606,
//           "minimum_bit_rate": 273,
//           "height": 1080,
//           "maximum_bit_rate": 3689,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262322/1445289064805-h2exzu/1668708299_00001.png",
//           "file_size": null,
//           "url": "https://vid.tasty.co/output/262322/hls24_1668708299.m3u8",
//           "bit_rate": null,
//           "aspect": "portrait",
//           "name": "low"
//         }
//       ],
//       "beauty_url": null,
//       "language": "eng",
//       "servings_noun_singular": "serving",
//       "sections": [
//         {
//           "components": [
//             {
//               "position": 1,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": ""
//                   },
//                   "quantity": "0",
//                   "id": 715687
//                 }
//               ],
//               "raw_text": "Vegetable oil, for frying",
//               "extra_comment": "for frying",
//               "ingredient": {
//                 "updated_at": 1509035288,
//                 "name": "vegetable oil",
//                 "created_at": 1493314628,
//                 "display_plural": "vegetable oils",
//                 "id": 20,
//                 "display_singular": "vegetable oil"
//               },
//               "id": 97866
//             },
//             {
//               "raw_text": "1 cup dry pancake mix",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 6179,
//                 "display_singular": "dry pancake mix",
//                 "updated_at": 1582073606,
//                 "name": "dry pancake mix",
//                 "created_at": 1582073606,
//                 "display_plural": "dry pancake mixes"
//               },
//               "id": 97867,
//               "position": 2,
//               "measurements": [
//                 {
//                   "unit": {
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c",
//                     "system": "imperial"
//                   },
//                   "quantity": "1",
//                   "id": 715684
//                 },
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "125",
//                   "id": 715682
//                 }
//               ]
//             },
//             {
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "water",
//                 "created_at": 1494124627,
//                 "display_plural": "waters",
//                 "id": 197,
//                 "display_singular": "water",
//                 "updated_at": 1509035280
//               },
//               "id": 97868,
//               "position": 3,
//               "measurements": [
//                 {
//                   "id": 715686,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   },
//                   "quantity": "½"
//                 },
//                 {
//                   "unit": {
//                     "abbreviation": "mL",
//                     "system": "metric",
//                     "name": "milliliter",
//                     "display_plural": "mL",
//                     "display_singular": "mL"
//                   },
//                   "quantity": "120",
//                   "id": 715685
//                 }
//               ],
//               "raw_text": "½ cup water"
//             },
//             {
//               "position": 4,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp"
//                   },
//                   "quantity": "1",
//                   "id": 715681
//                 }
//               ],
//               "raw_text": "1 tablespoon unsalted butter, melted",
//               "extra_comment": "melted",
//               "ingredient": {
//                 "id": 291,
//                 "display_singular": "unsalted butter",
//                 "updated_at": 1509035272,
//                 "name": "unsalted butter",
//                 "created_at": 1494806355,
//                 "display_plural": "unsalted butters"
//               },
//               "id": 97869
//             }
//           ],
//           "name": null,
//           "position": 1
//         },
//         {
//           "components": [
//             {
//               "extra_comment": "",
//               "ingredient": {
//                 "created_at": 1495218157,
//                 "display_plural": "whipped creams",
//                 "id": 528,
//                 "display_singular": "whipped cream",
//                 "updated_at": 1509035253,
//                 "name": "whipped cream"
//               },
//               "id": 97871,
//               "position": 6,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "0",
//                   "id": 715683
//                 }
//               ],
//               "raw_text": "Whipped cream"
//             },
//             {
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": ""
//                   },
//                   "quantity": "0",
//                   "id": 715688
//                 }
//               ],
//               "raw_text": "Fresh berries",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035130,
//                 "name": "fresh berries",
//                 "created_at": 1500596638,
//                 "display_plural": "fresh berries",
//                 "id": 2369,
//                 "display_singular": "fresh berry"
//               },
//               "id": 97872,
//               "position": 7
//             },
//             {
//               "raw_text": "Melted chocolate",
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "melted chocolate",
//                 "created_at": 1520422306,
//                 "display_plural": "melted chocolates",
//                 "id": 3831,
//                 "display_singular": "melted chocolate",
//                 "updated_at": 1520422306
//               },
//               "id": 97873,
//               "position": 8,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "0",
//                   "id": 715679
//                 }
//               ]
//             }
//           ],
//           "name": "For Serving",
//           "position": 2
//         }
//       ],
//       "nutrition": {
//         "carbohydrates": 61,
//         "fiber": 2,
//         "updated_at": "2022-11-19T07:09:31+01:00",
//         "protein": 8,
//         "fat": 21,
//         "calories": 474,
//         "sugar": 13
//       },
//       "total_time_minutes": 30,
//       "compilations": [],
//       "buzz_id": null,
//       "tips_and_ratings_enabled": true,
//       "thumbnail_alt_text": "",
//       "promotion": "full",
//       "servings_noun_plural": "Servings",
//       "topics": [
//         {
//           "name": "5 Ingredients or Less",
//           "slug": "5-ingredients-or-less"
//         },
//         {
//           "name": "Best Vegetarian",
//           "slug": "best-vegetarian"
//         },
//         {
//           "name": "Breakfast",
//           "slug": "breakfast"
//         },
//         {
//           "name": "American",
//           "slug": "american"
//         }
//       ],
//       "yields": "Servings: 2",
//       "user_ratings": {
//         "count_positive": 10,
//         "score": 0.625,
//         "count_negative": 6
//       },
//       "id": 8546,
//       "brand_id": null,
//       "name": "Pancake Batter Cones",
//       "created_at": 1668708345,
//       "facebook_posts": [],
//       "slug": "pancake-batter-cones",
//       "num_servings": 2,
//       "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/411315.jpg",
//       "cook_time_minutes": 15,
//       "instructions": [
//         {
//           "temperature": null,
//           "id": 73834,
//           "position": 1,
//           "display_text": "Fill a medium pot halfway with vegetable oil and heat over medium-high heat until the temperature reaches 350°F (180°C).",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0
//         },
//         {
//           "id": 73835,
//           "position": 2,
//           "display_text": "In a medium bowl, whisk together the pancake mix and water until smooth, then whisk in the melted butter until incorporated.",
//           "start_time": 2000,
//           "appliance": null,
//           "end_time": 4500,
//           "temperature": null
//         },
//         {
//           "start_time": 5000,
//           "appliance": null,
//           "end_time": 19500,
//           "temperature": null,
//           "id": 73836,
//           "position": 3,
//           "display_text": "Dip a triangular cake server in the hot oil, then allow any excess oil to drip back into the pot. Dip the hot server into the pancake batter, turning to coat with a thin layer of the batter. Hold the server in the hot oil and fry until the batter is golden brown, 1–2 minutes. Dip the server in the batter again to coat with another layer, then fry once more until golden brown, 1–2 minutes more. Transfer to a paper towel-lined plate to drain, using a butter knife to carefully release the cone from the cake server. Repeat with the remaining batter."
//         },
//         {
//           "end_time": 28333,
//           "temperature": null,
//           "id": 73837,
//           "position": 4,
//           "display_text": "Fill the cones with whipped cream and fresh berries. Stack on a plate and drizzle with melted chocolate. Serve warm.",
//           "start_time": 20000,
//           "appliance": null
//         },
//         {
//           "start_time": 29333,
//           "appliance": null,
//           "end_time": 30000,
//           "temperature": null,
//           "id": 73838,
//           "position": 5,
//           "display_text": "Enjoy!"
//         }
//       ],
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "credits": [
//         {
//           "name": "Bella Lopez",
//           "type": "internal"
//         }
//       ],
//       "total_time_tier": {
//         "display_tier": "Under 30 minutes",
//         "tier": "under_30_minutes"
//       },
//       "canonical_id": "recipe:8546",
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/1d733ea0af2a43bf890d5164a8868631/PancakeBatterCones.mp4",
//       "video_id": 166572,
//       "keywords": "",
//       "description": "Tired of basic pancakes? Try these pancake cones for a fun and indulgent way of using pancake batter! Load the cones with your fillings, like whipped cream and berries.",
//       "video_url": "https://vid.tasty.co/output/262322/hls24_1668708299.m3u8",
//       "approved_at": 1669672732,
//       "is_shoppable": true
//     },
//     {
//       "draft_status": "published",
//       "yields": "Description: Our quick and easy homemade cranberry sauce is flavored with orange and cinnamon to tap into those holiday flavors (store bought cranberry sauce can be used too). We stack two Snyder’s of Hanover® Pretzel Snaps, “gluing” them together with a ",
//       "video_url": "https://vid.tasty.co/output/262154/hls24_1668638306.m3u8",
//       "nutrition_visibility": "auto",
//       "country": "US",
//       "instructions": [
//         {
//           "appliance": null,
//           "end_time": 18333,
//           "temperature": null,
//           "id": 73830,
//           "position": 1,
//           "display_text": "Make the cranberry sauce: In a medium saucepan, combine the cranberries, orange juice, sugar, orange peel, and cinnamon stick. Bring to a boil over medium-high heat, then reduce the heat to medium-low and simmer uncovered for 12–15 minutes, until the cranberries have burst and the liquid has reduced by half. Remove the pot from the heat and let the sauce cool to room temperature, then discard the cinnamon stick and orange peel. Any cranberry sauce left over after assembly will keep in an airtight container in the refrigerator for up to 4 days. (If using store-bought cranberry sauce, skip this step.)",
//           "start_time": 11666
//         },
//         {
//           "start_time": 22371,
//           "appliance": null,
//           "end_time": 33366,
//           "temperature": null,
//           "id": 73831,
//           "position": 2,
//           "display_text": "Assemble the pretzel stack: spread ½ teaspoon of ricotta on one side of a Snyder’s of Hanover® Pretzel Snap and stack another pretzel on top, positioning the second pretzel 45° from the first, so as to cover the holes. Scoop another 1 teaspoon of ricotta onto the pretzel stack and, using the back of the teaspoon, make a divot in the center of the ricotta. Spoon 1 teaspoon of cranberry sauce into the divot. Repeat to make the remaining pretzel stackers."
//         },
//         {
//           "appliance": null,
//           "end_time": 37333,
//           "temperature": null,
//           "id": 73832,
//           "position": 3,
//           "display_text": "Garnish each stacker with an optional small sprig of rosemary and a sprinkle of orange zest.",
//           "start_time": 35000
//         },
//         {
//           "start_time": 41000,
//           "appliance": null,
//           "end_time": 42000,
//           "temperature": null,
//           "id": 73833,
//           "position": 4,
//           "display_text": "Enjoy!"
//         }
//       ],
//       "slug": "ricotta-and-cranberry-pretzel-snaps-stackers",
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "description": "Our quick and easy homemade cranberry sauce is flavored with orange and cinnamon to tap into those holiday flavors (store-bought cranberry sauce can be used too). We stack two Snyder’s of Hanover® Pretzel Snaps, “gluing” them together with a smear of ricotta, then adding a dollop more ricotta and some of our cranberry sauce on top. The optional rosemary sprig garnish seals in the holiday vibes and the bit of orange zest adds citrusy aroma.",
//       "inspired_by_url": null,
//       "topics": [
//         {
//           "name": "BBQ Season",
//           "slug": "bbq"
//         },
//         {
//           "name": "Best Vegetarian",
//           "slug": "best-vegetarian"
//         },
//         {
//           "name": "Christmas",
//           "slug": "christmas"
//         },
//         {
//           "name": "Fall Recipes",
//           "slug": "fall"
//         },
//         {
//           "name": "Thanksgiving",
//           "slug": "thanksgiving"
//         },
//         {
//           "name": "Winter Recipes",
//           "slug": "winter"
//         },
//         {
//           "name": "Snacks",
//           "slug": "snacks"
//         },
//         {
//           "name": "American",
//           "slug": "american"
//         }
//       ],
//       "canonical_id": "recipe:8545",
//       "thumbnail_alt_text": "",
//       "total_time_minutes": null,
//       "servings_noun_plural": "stackers",
//       "renditions": [
//         {
//           "container": "mp4",
//           "content_type": "video/mp4",
//           "name": "mp4_404x720",
//           "maximum_bit_rate": null,
//           "bit_rate": 1833,
//           "aspect": "portrait",
//           "width": 404,
//           "minimum_bit_rate": null,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262154/square_720/1668638306_00001.png",
//           "file_size": 9639330,
//           "url": "https://vid.tasty.co/output/262154/square_720/1668638306",
//           "duration": 42075,
//           "height": 720
//         },
//         {
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "file_size": 3329083,
//           "url": "https://vid.tasty.co/output/262154/square_320/1668638306",
//           "bit_rate": 633,
//           "width": 180,
//           "minimum_bit_rate": null,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262154/square_320/1668638306_00001.png",
//           "duration": 42075,
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "name": "mp4_180x320",
//           "height": 320
//         },
//         {
//           "url": "https://vid.tasty.co/output/262154/landscape_720/1668638306",
//           "duration": 42075,
//           "maximum_bit_rate": null,
//           "height": 720,
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "width": 404,
//           "minimum_bit_rate": null,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262154/landscape_720/1668638306_00001.png",
//           "file_size": 9626584,
//           "bit_rate": 1831,
//           "name": "mp4_404x720"
//         },
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262154/landscape_480/1668638306_00001.png",
//           "duration": 42075,
//           "content_type": "video/mp4",
//           "minimum_bit_rate": null,
//           "name": "mp4_270x480",
//           "width": 270,
//           "maximum_bit_rate": null,
//           "height": 480,
//           "container": "mp4",
//           "file_size": 5531409,
//           "url": "https://vid.tasty.co/output/262154/landscape_480/1668638306",
//           "bit_rate": 1052,
//           "aspect": "portrait"
//         },
//         {
//           "container": "ts",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262154/1445289064805-h2exzu/1668638306_00001.png",
//           "file_size": null,
//           "url": "https://vid.tasty.co/output/262154/hls24_1668638306.m3u8",
//           "duration": 42084,
//           "content_type": "application/vnd.apple.mpegurl",
//           "width": 608,
//           "name": "low",
//           "height": 1080,
//           "bit_rate": null,
//           "aspect": "portrait",
//           "minimum_bit_rate": 272,
//           "maximum_bit_rate": 2855
//         }
//       ],
//       "beauty_url": null,
//       "total_time_tier": {
//         "tier": "under_30_minutes",
//         "display_tier": "Under 30 minutes"
//       },
//       "id": 8545,
//       "prep_time_minutes": 10,
//       "nutrition": {},
//       "compilations": [],
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/43a118acac584c829b4091d81cb0d0ca/Snyders_BFV96957_RicottaCranberryPretzelSnapsStackers_TikTok.mp4",
//       "price": {
//         "portion": 100,
//         "consumption_total": 700,
//         "consumption_portion": 50,
//         "total": 950,
//         "updated_at": "2022-12-24T06:30:55+01:00"
//       },
//       "sections": [
//         {
//           "components": [
//             {
//               "position": 2,
//               "measurements": [
//                 {
//                   "id": 714729,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "ounce",
//                     "display_plural": "oz",
//                     "display_singular": "oz",
//                     "abbreviation": "oz"
//                   },
//                   "quantity": "12"
//                 }
//               ],
//               "raw_text": "n/a",
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "fresh cranberries",
//                 "created_at": 1538679692,
//                 "display_plural": "fresh cranberries",
//                 "id": 4781,
//                 "display_singular": "fresh cranberry",
//                 "updated_at": 1538679692
//               },
//               "id": 97891
//             },
//             {
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 485,
//                 "display_singular": "orange juice",
//                 "updated_at": 1509035256,
//                 "name": "orange juice",
//                 "created_at": 1495141563,
//                 "display_plural": "orange juices"
//               },
//               "id": 97859,
//               "position": 3,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_singular": "mL",
//                     "abbreviation": "mL",
//                     "system": "metric",
//                     "name": "milliliter",
//                     "display_plural": "mL"
//                   },
//                   "quantity": "180",
//                   "id": 714737
//                 },
//                 {
//                   "unit": {
//                     "abbreviation": "c",
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup"
//                   },
//                   "quantity": "¾",
//                   "id": 714735
//                 }
//               ],
//               "raw_text": "3⁄4 cup orange juice"
//             },
//             {
//               "position": 4,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric",
//                     "name": "gram"
//                   },
//                   "quantity": "150",
//                   "id": 714736
//                 },
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   },
//                   "quantity": "¾",
//                   "id": 714734
//                 }
//               ],
//               "raw_text": "3⁄4 cup sugar",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 24,
//                 "display_singular": "sugar",
//                 "updated_at": 1509035288,
//                 "name": "sugar",
//                 "created_at": 1493314650,
//                 "display_plural": "sugars"
//               },
//               "id": 97860
//             },
//             {
//               "raw_text": "1 2-inch orange peel",
//               "extra_comment": "2-inch (5-cm)",
//               "ingredient": {
//                 "id": 2981,
//                 "display_singular": "orange peel",
//                 "updated_at": 1509035096,
//                 "name": "orange peel",
//                 "created_at": 1505133506,
//                 "display_plural": "orange peels"
//               },
//               "id": 97861,
//               "position": 5,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "1",
//                   "id": 714733
//                 }
//               ]
//             },
//             {
//               "raw_text": "1 whole cinnamon stick",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1668710042,
//                 "name": "whole cinnamon stick",
//                 "created_at": 1668710042,
//                 "display_plural": "whole cinnamon sticks",
//                 "id": 10487,
//                 "display_singular": "whole cinnamon stick"
//               },
//               "id": 97862,
//               "position": 6,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "1",
//                   "id": 714738
//                 }
//               ]
//             }
//           ],
//           "name": "Cranberry Sauce (or use store-bought)",
//           "position": 1
//         },
//         {
//           "components": [
//             {
//               "raw_text": "24 Snyder’s of Hanover® Pretzel Snaps 3⁄4 cup ricotta cheese",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_singular": "Snyder’ of hanover® pretzel snaps",
//                 "updated_at": 1668694389,
//                 "name": "Snyder’s of Hanover® Pretzel Snaps",
//                 "created_at": 1668694389,
//                 "display_plural": "Snyder’s of hanover® pretzel snaps",
//                 "id": 10463
//               },
//               "id": 97864,
//               "position": 8,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "24",
//                   "id": 714730
//                 }
//               ]
//             },
//             {
//               "position": 9,
//               "measurements": [
//                 {
//                   "unit": {
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric"
//                   },
//                   "quantity": "150",
//                   "id": 714740
//                 },
//                 {
//                   "quantity": "¾",
//                   "id": 714739,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   }
//                 }
//               ],
//               "raw_text": "n/a",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 2,
//                 "display_singular": "ricotta cheese",
//                 "updated_at": 1509035290,
//                 "name": "ricotta cheese",
//                 "created_at": 1493246113,
//                 "display_plural": "ricotta cheeses"
//               },
//               "id": 97892
//             },
//             {
//               "extra_comment": "optional",
//               "ingredient": {
//                 "updated_at": 1509035257,
//                 "name": "fresh rosemary",
//                 "created_at": 1495134627,
//                 "display_plural": "fresh rosemaries",
//                 "id": 476,
//                 "display_singular": "fresh rosemary"
//               },
//               "id": 97865,
//               "position": 10,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "small sprigs",
//                     "display_singular": "small sprig",
//                     "abbreviation": "small sprig",
//                     "system": "none",
//                     "name": "small sprig"
//                   },
//                   "quantity": "12",
//                   "id": 714732
//                 }
//               ],
//               "raw_text": "12 small sprigs of fresh rosemary, optional Orange zest, for garnish"
//             },
//             {
//               "ingredient": {
//                 "display_singular": "orange zest",
//                 "updated_at": 1509035256,
//                 "name": "orange zest",
//                 "created_at": 1495141697,
//                 "display_plural": "orange zests",
//                 "id": 487
//               },
//               "id": 97893,
//               "position": 11,
//               "measurements": [],
//               "raw_text": "n/a",
//               "extra_comment": "for garnish "
//             }
//           ],
//           "name": "Pretzel Stackers",
//           "position": 2
//         }
//       ],
//       "brand_id": 120,
//       "tips_and_ratings_enabled": true,
//       "aspect_ratio": "9:16",
//       "credits": [
//         {
//           "name": "Snyder’s of Hanover®",
//           "id": 120,
//           "type": "brand",
//           "slug": "snyders-of-hanover-r",
//           "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/520db462496a40c7acf82656c1b217c9.jpeg"
//         }
//       ],
//       "approved_at": 1668710203,
//       "promotion": "full",
//       "keywords": "",
//       "language": "eng",
//       "servings_noun_singular": "stacker",
//       "num_servings": 12,
//       "updated_at": 1668710203,
//       "is_one_top": false,
//       "is_shoppable": true,
//       "facebook_posts": [],
//       "user_ratings": {
//         "count_negative": 0,
//         "count_positive": 4,
//         "score": 1
//       },
//       "brand": {
//         "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/520db462496a40c7acf82656c1b217c9.jpeg",
//         "name": "Snyder’s of Hanover®",
//         "id": 120,
//         "slug": "snyders-of-hanover-r"
//       },
//       "show_id": 17,
//       "tags": [
//         {
//           "name": "appetizers",
//           "id": 64481,
//           "display_name": "Appetizers",
//           "type": "meal"
//         },
//         {
//           "name": "fall",
//           "id": 64508,
//           "display_name": "Fall",
//           "type": "seasonal"
//         },
//         {
//           "name": "bbq",
//           "id": 64504,
//           "display_name": "BBQ",
//           "type": "occasion"
//         },
//         {
//           "display_name": "Casual Party",
//           "type": "occasion",
//           "name": "casual_party",
//           "id": 64503
//         },
//         {
//           "id": 64472,
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty",
//           "name": "under_30_minutes"
//         },
//         {
//           "name": "snacks",
//           "id": 64491,
//           "display_name": "Snacks",
//           "type": "meal"
//         },
//         {
//           "name": "thanksgiving",
//           "id": 64479,
//           "display_name": "Thanksgiving",
//           "type": "holiday"
//         },
//         {
//           "name": "christmas",
//           "id": 64473,
//           "display_name": "Christmas",
//           "type": "holiday"
//         },
//         {
//           "name": "american",
//           "id": 64444,
//           "display_name": "American",
//           "type": "cuisine"
//         },
//         {
//           "id": 65848,
//           "display_name": "Stove Top",
//           "type": "appliance",
//           "name": "stove_top"
//         },
//         {
//           "name": "winter",
//           "id": 64511,
//           "display_name": "Winter",
//           "type": "seasonal"
//         },
//         {
//           "name": "under_45_minutes",
//           "id": 8091747,
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_1_hour",
//           "id": 8091748,
//           "display_name": "Under 1 Hour",
//           "type": "difficulty"
//         },
//         {
//           "name": "vegetarian",
//           "id": 64469,
//           "display_name": "Vegetarian",
//           "type": "dietary"
//         }
//       ],
//       "name": "Ricotta And Cranberry Pretzel Snaps Stackers",
//       "created_at": 1668638766,
//       "video_ad_content": "co_branded",
//       "buzz_id": null,
//       "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/411126.jpg",
//       "seo_title": "",
//       "cook_time_minutes": 15,
//       "video_id": 172068
//     },
//     {
//       "credits": [
//         {
//           "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/520db462496a40c7acf82656c1b217c9.jpeg",
//           "name": "Snyder’s of Hanover®",
//           "id": 120,
//           "type": "brand",
//           "slug": "snyders-of-hanover-r"
//         }
//       ],
//       "total_time_tier": {
//         "tier": "under_30_minutes",
//         "display_tier": "Under 30 minutes"
//       },
//       "seo_title": "",
//       "nutrition_visibility": "auto",
//       "facebook_posts": [],
//       "user_ratings": {
//         "count_positive": 1,
//         "score": 1,
//         "count_negative": 0
//       },
//       "video_url": "https://vid.tasty.co/output/262153/hls24_1668638302.m3u8",
//       "servings_noun_singular": "bite",
//       "nutrition": {},
//       "tips_and_ratings_enabled": true,
//       "created_at": 1668638706,
//       "approved_at": 1668709885,
//       "renditions": [
//         {
//           "file_size": 8543802,
//           "url": "https://vid.tasty.co/output/262153/square_720/1668638302",
//           "duration": 46928,
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262153/square_720/1668638302_00001.png",
//           "bit_rate": 1457,
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "width": 404,
//           "name": "mp4_404x720",
//           "height": 720,
//           "container": "mp4"
//         },
//         {
//           "url": "https://vid.tasty.co/output/262153/square_320/1668638302",
//           "bit_rate": 535,
//           "content_type": "video/mp4",
//           "minimum_bit_rate": null,
//           "name": "mp4_180x320",
//           "maximum_bit_rate": null,
//           "height": 320,
//           "file_size": 3136167,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262153/square_320/1668638302_00001.png",
//           "duration": 46928,
//           "aspect": "portrait",
//           "width": 180,
//           "container": "mp4"
//         },
//         {
//           "aspect": "portrait",
//           "maximum_bit_rate": null,
//           "duration": 46928,
//           "bit_rate": 1458,
//           "content_type": "video/mp4",
//           "width": 404,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262153/landscape_720/1668638302_00001.png",
//           "file_size": 8552058,
//           "url": "https://vid.tasty.co/output/262153/landscape_720/1668638302",
//           "minimum_bit_rate": null,
//           "name": "mp4_404x720",
//           "height": 720
//         },
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262153/landscape_480/1668638302_00001.png",
//           "duration": 46928,
//           "bit_rate": 856,
//           "width": 270,
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "file_size": 5016257,
//           "url": "https://vid.tasty.co/output/262153/landscape_480/1668638302",
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "name": "mp4_270x480",
//           "height": 480
//         },
//         {
//           "file_size": null,
//           "url": "https://vid.tasty.co/output/262153/hls24_1668638302.m3u8",
//           "bit_rate": null,
//           "name": "low",
//           "height": 1080,
//           "minimum_bit_rate": 274,
//           "maximum_bit_rate": 2261,
//           "container": "ts",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/262153/1445289064805-h2exzu/1668638302_00001.png",
//           "duration": 46922,
//           "content_type": "application/vnd.apple.mpegurl",
//           "aspect": "portrait",
//           "width": 608
//         }
//       ],
//       "is_shoppable": true,
//       "yields": "Description: Gooey baked brie and crispy bacon pieces are layered atop a Snyder’s of Hanover® Pretzel Snap, then sandwiched with another Snyder’s Pretzel Snap on top, drizzled with honey, and garnished with an optional small sprig of thyme for fragrance a",
//       "price": {
//         "consumption_total": 4450,
//         "consumption_portion": 350,
//         "total": 4700,
//         "updated_at": "2022-12-24T06:30:55+01:00",
//         "portion": 400
//       },
//       "id": 8544,
//       "prep_time_minutes": 10,
//       "promotion": "full",
//       "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/411125.jpg",
//       "canonical_id": "recipe:8544",
//       "video_id": 172072,
//       "slug": "pretzel-snaps-and-bacon-baked-brie",
//       "show_id": 17,
//       "buzz_id": null,
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "thumbnail_alt_text": "",
//       "keywords": "",
//       "tags": [
//         {
//           "name": "appetizers",
//           "id": 64481,
//           "display_name": "Appetizers",
//           "type": "meal"
//         },
//         {
//           "type": "appliance",
//           "name": "oven",
//           "id": 65846,
//           "display_name": "Oven"
//         },
//         {
//           "name": "bbq",
//           "id": 64504,
//           "display_name": "BBQ",
//           "type": "occasion"
//         },
//         {
//           "name": "casual_party",
//           "id": 64503,
//           "display_name": "Casual Party",
//           "type": "occasion"
//         },
//         {
//           "name": "5_ingredients_or_less",
//           "id": 64470,
//           "display_name": "5 Ingredients or Less",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_30_minutes",
//           "id": 64472,
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "snacks",
//           "id": 64491,
//           "display_name": "Snacks",
//           "type": "meal"
//         },
//         {
//           "name": "american",
//           "id": 64444,
//           "display_name": "American",
//           "type": "cuisine"
//         },
//         {
//           "id": 188967,
//           "display_name": "Special Occasion",
//           "type": "occasion",
//           "name": "special_occasion"
//         },
//         {
//           "id": 64508,
//           "display_name": "Fall",
//           "type": "seasonal",
//           "name": "fall"
//         },
//         {
//           "type": "seasonal",
//           "name": "winter",
//           "id": 64511,
//           "display_name": "Winter"
//         }
//       ],
//       "name": "Pretzel Snaps And Bacon Baked Brie",
//       "servings_noun_plural": "bites",
//       "beauty_url": null,
//       "topics": [
//         {
//           "name": "5 Ingredients or Less",
//           "slug": "5-ingredients-or-less"
//         },
//         {
//           "name": "BBQ Season",
//           "slug": "bbq"
//         },
//         {
//           "name": "Fall Recipes",
//           "slug": "fall"
//         },
//         {
//           "name": "Winter Recipes",
//           "slug": "winter"
//         },
//         {
//           "name": "Snacks",
//           "slug": "snacks"
//         },
//         {
//           "slug": "american",
//           "name": "American"
//         }
//       ],
//       "video_ad_content": "co_branded",
//       "country": "US",
//       "sections": [
//         {
//           "components": [
//             {
//               "extra_comment": "",
//               "ingredient": {
//                 "display_singular": "bacon",
//                 "updated_at": 1509035279,
//                 "name": "bacon",
//                 "created_at": 1494212643,
//                 "display_plural": "bacons",
//                 "id": 214
//               },
//               "id": 97854,
//               "position": 1,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "strip",
//                     "display_plural": "strips",
//                     "display_singular": "strip",
//                     "abbreviation": "strip"
//                   },
//                   "quantity": "6",
//                   "id": 714741
//                 }
//               ],
//               "raw_text": "6 strips of bacon"
//             },
//             {
//               "raw_text": "24 Snyder’s of Hanover® Pretzel Snaps 6 ounces Brie cheese with rind",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 10463,
//                 "display_singular": "Snyder’ of hanover® pretzel snaps",
//                 "updated_at": 1668694389,
//                 "name": "Snyder’s of Hanover® Pretzel Snaps",
//                 "created_at": 1668694389,
//                 "display_plural": "Snyder’s of hanover® pretzel snaps"
//               },
//               "id": 97855,
//               "position": 2,
//               "measurements": [
//                 {
//                   "quantity": "24",
//                   "id": 714742,
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   }
//                 }
//               ]
//             },
//             {
//               "id": 97890,
//               "position": 3,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "ounce",
//                     "display_plural": "oz",
//                     "display_singular": "oz",
//                     "abbreviation": "oz"
//                   },
//                   "quantity": "6",
//                   "id": 714744
//                 },
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "165",
//                   "id": 714743
//                 }
//               ],
//               "raw_text": "n/a",
//               "extra_comment": "with rind",
//               "ingredient": {
//                 "updated_at": 1509035277,
//                 "name": "brie cheese",
//                 "created_at": 1494296781,
//                 "display_plural": "brie cheeses",
//                 "id": 240,
//                 "display_singular": "brie cheese"
//               }
//             },
//             {
//               "raw_text": "1⁄4 cup honey",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035286,
//                 "name": "honey",
//                 "created_at": 1493430363,
//                 "display_plural": "honeys",
//                 "id": 52,
//                 "display_singular": "honey"
//               },
//               "id": 97856,
//               "position": 4,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   },
//                   "quantity": "¼",
//                   "id": 714746
//                 },
//                 {
//                   "quantity": "55",
//                   "id": 714745,
//                   "unit": {
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric"
//                   }
//                 }
//               ]
//             },
//             {
//               "ingredient": {
//                 "display_plural": "fresh thymes",
//                 "id": 477,
//                 "display_singular": "fresh thyme",
//                 "updated_at": 1509035257,
//                 "name": "fresh thyme",
//                 "created_at": 1495134646
//               },
//               "id": 97857,
//               "position": 5,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "small sprig",
//                     "display_plural": "small sprigs",
//                     "display_singular": "small sprig",
//                     "abbreviation": "small sprig"
//                   },
//                   "quantity": "12",
//                   "id": 714747
//                 }
//               ],
//               "raw_text": "12 small sprigs of fresh thyme, optional",
//               "extra_comment": "optional"
//             }
//           ],
//           "name": null,
//           "position": 1
//         }
//       ],
//       "inspired_by_url": null,
//       "updated_at": 1668709886,
//       "is_one_top": false,
//       "aspect_ratio": "9:16",
//       "description": "Gooey baked Brie and crispy bacon pieces are layered atop a Snyder’s of Hanover® Pretzel Snap, then sandwiched with another Snyder’s Pretzel Snap on top, drizzled with honey, and garnished with an optional small sprig of thyme for fragrance and a pop of greenery. The bacon is cut to size prior to cooking so the rectangles stay intact.",
//       "draft_status": "published",
//       "brand_id": 120,
//       "compilations": [],
//       "num_servings": 12,
//       "total_time_minutes": null,
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/2c12056aed3a41889fa7e634fd69576e/Snyders_BFV96960_PretzelSnapsBaconBakedBrie_TikTok.mp4",
//       "instructions": [
//         {
//           "temperature": 400,
//           "id": 73813,
//           "position": 1,
//           "display_text": "Preheat the oven to 400°F (200°C). Line 2 baking sheets with parchment paper.",
//           "start_time": 0,
//           "appliance": "oven",
//           "end_time": 0
//         },
//         {
//           "appliance": null,
//           "end_time": 15500,
//           "temperature": null,
//           "id": 73814,
//           "position": 2,
//           "display_text": "Using scissors or a knife, cut each strip of bacon crosswise into 4–5 small rectangles. Arrange the slices on a prepared baking sheet.",
//           "start_time": 12000
//         },
//         {
//           "temperature": null,
//           "id": 73817,
//           "position": 3,
//           "display_text": "Bake for 10–12 minutes, or until the bacon reaches your desired crispiness, being careful not to burn it. Transfer the bacon to a wire rack to cool, blotting with a paper towel to remove excess grease before using. Leave the oven on.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0
//         },
//         {
//           "id": 73820,
//           "position": 4,
//           "display_text": "Slice the Brie into ½-inch-thick planks, then slice into 1-inch-wide squares for a total of 12 squares.",
//           "start_time": 21000,
//           "appliance": null,
//           "end_time": 25000,
//           "temperature": null
//         },
//         {
//           "id": 73822,
//           "position": 5,
//           "display_text": "Place 12 Snyder’s Pretzel Snaps on the remaining prepared baking sheet. Top each pretzel with one cooked bacon slice, then a square of Brie, then one more bacon slice, then top each with another pretzel.",
//           "start_time": 31000,
//           "appliance": null,
//           "end_time": 36166,
//           "temperature": null
//         },
//         {
//           "temperature": null,
//           "id": 73825,
//           "position": 6,
//           "display_text": "Bake the bites for 2–3 minutes, until the Brie is warm and softened, but not completely melted; keep a close eye to avoid over-melting the cheese. Remove from the oven.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0
//         },
//         {
//           "appliance": null,
//           "end_time": 39666,
//           "temperature": null,
//           "id": 73827,
//           "position": 7,
//           "display_text": "Drizzle the bites with honey, then garnish each with an optional small sprig of thyme.",
//           "start_time": 38000
//         },
//         {
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 73828,
//           "position": 8,
//           "display_text": "Serve warm."
//         },
//         {
//           "id": 73829,
//           "position": 9,
//           "display_text": "Enjoy!",
//           "start_time": 40000,
//           "appliance": null,
//           "end_time": 45333,
//           "temperature": null
//         }
//       ],
//       "language": "eng",
//       "brand": {
//         "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/520db462496a40c7acf82656c1b217c9.jpeg",
//         "name": "Snyder’s of Hanover®",
//         "id": 120,
//         "slug": "snyders-of-hanover-r"
//       },
//       "cook_time_minutes": 15
//     },
//     {
//       "renditions": [
//         {
//           "file_size": 7494822,
//           "url": "https://vid.tasty.co/output/242299/square_720/1654719428",
//           "duration": 31574,
//           "bit_rate": 1899,
//           "aspect": "portrait",
//           "height": 720,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/242299/square_720/1654719428_00001.png",
//           "content_type": "video/mp4",
//           "width": 404,
//           "minimum_bit_rate": null,
//           "name": "mp4_404x720",
//           "maximum_bit_rate": null
//         },
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/242299/square_320/1654719428_00001.png",
//           "file_size": 2591800,
//           "bit_rate": 657,
//           "name": "mp4_180x320",
//           "maximum_bit_rate": null,
//           "minimum_bit_rate": null,
//           "height": 320,
//           "container": "mp4",
//           "url": "https://vid.tasty.co/output/242299/square_320/1654719428",
//           "duration": 31574,
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "width": 180
//         },
//         {
//           "url": "https://vid.tasty.co/output/242299/landscape_720/1654719428",
//           "duration": 31574,
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "name": "mp4_404x720",
//           "height": 720,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/242299/landscape_720/1654719428_00001.png",
//           "width": 404,
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "file_size": 7484703,
//           "bit_rate": 1897
//         },
//         {
//           "container": "mp4",
//           "duration": 31574,
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "width": 270,
//           "height": 480,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/242299/landscape_480/1654719428_00001.png",
//           "file_size": 4280981,
//           "url": "https://vid.tasty.co/output/242299/landscape_480/1654719428",
//           "bit_rate": 1085,
//           "minimum_bit_rate": null,
//           "name": "mp4_270x480",
//           "maximum_bit_rate": null
//         },
//         {
//           "duration": 31615,
//           "bit_rate": null,
//           "width": 608,
//           "height": 1080,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/242299/1445289064805-h2exzu/1654719428_00001.png",
//           "file_size": null,
//           "content_type": "application/vnd.apple.mpegurl",
//           "aspect": "portrait",
//           "minimum_bit_rate": 277,
//           "name": "low",
//           "maximum_bit_rate": 2973,
//           "container": "ts",
//           "url": "https://vid.tasty.co/output/242299/hls24_1654719428.m3u8"
//         }
//       ],
//       "beauty_url": null,
//       "nutrition": {},
//       "compilations": [],
//       "is_one_top": false,
//       "show": {
//         "id": 17,
//         "name": "Tasty"
//       },
//       "created_at": 1654719160,
//       "is_shoppable": true,
//       "total_time_tier": {
//         "tier": "under_30_minutes",
//         "display_tier": "Under 30 minutes"
//       },
//       "language": "eng",
//       "user_ratings": {
//         "count_positive": 30,
//         "score": 0.909091,
//         "count_negative": 3
//       },
//       "tips_and_ratings_enabled": true,
//       "seo_title": "",
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/787814def6764d23a8051c52f9ff1764/BFV92296_DougSLinguine-Tiktok_16x9_v1.mp4",
//       "cook_time_minutes": 15,
//       "country": "US",
//       "tags": [
//         {
//           "display_name": "Stove Top",
//           "type": "appliance",
//           "name": "stove_top",
//           "id": 65848
//         },
//         {
//           "name": "italian",
//           "id": 64453,
//           "display_name": "Italian",
//           "type": "cuisine"
//         },
//         {
//           "type": "difficulty",
//           "name": "under_30_minutes",
//           "id": 64472,
//           "display_name": "Under 30 Minutes"
//         },
//         {
//           "type": "cooking_style",
//           "name": "one_pot_or_pan",
//           "id": 65855,
//           "display_name": "One-Pot or Pan"
//         },
//         {
//           "name": "summer",
//           "id": 64510,
//           "display_name": "Summer",
//           "type": "seasonal"
//         },
//         {
//           "name": "dinner",
//           "id": 64486,
//           "display_name": "Dinner",
//           "type": "meal"
//         },
//         {
//           "id": 8091747,
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty",
//           "name": "under_45_minutes"
//         },
//         {
//           "name": "under_1_hour",
//           "id": 8091748,
//           "display_name": "Under 1 Hour",
//           "type": "difficulty"
//         },
//         {
//           "name": "pescatarian",
//           "id": 3801552,
//           "display_name": "Pescatarian",
//           "type": "dietary"
//         },
//         {
//           "id": 64469,
//           "display_name": "Vegetarian",
//           "type": "dietary",
//           "name": "vegetarian"
//         }
//       ],
//       "video_ad_content": "none",
//       "sections": [
//         {
//           "name": null,
//           "position": 1,
//           "components": [
//             {
//               "position": 1,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "mL",
//                     "system": "metric",
//                     "name": "milliliter",
//                     "display_plural": "mL",
//                     "display_singular": "mL"
//                   },
//                   "quantity": "80",
//                   "id": 714573
//                 },
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   },
//                   "quantity": "⅓",
//                   "id": 714572
//                 }
//               ],
//               "raw_text": "⅓ cup extra-virgin olive oil",
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "extra virgin olive oil",
//                 "created_at": 1495076759,
//                 "display_plural": "extra virgin olive oils",
//                 "id": 452,
//                 "display_singular": "extra virgin olive oil",
//                 "updated_at": 1509035259
//               },
//               "id": 94623
//             },
//             {
//               "raw_text": "½ medium yellow onion, finely chopped",
//               "extra_comment": "finely chopped",
//               "ingredient": {
//                 "id": 942,
//                 "display_singular": "medium yellow onion",
//                 "updated_at": 1509035220,
//                 "name": "medium yellow onion",
//                 "created_at": 1496102165,
//                 "display_plural": "medium yellow onions"
//               },
//               "id": 94624,
//               "position": 2,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": ""
//                   },
//                   "quantity": "½",
//                   "id": 714574
//                 }
//               ]
//             },
//             {
//               "extra_comment": "plus more to taste",
//               "ingredient": {
//                 "updated_at": 1509035289,
//                 "name": "kosher salt",
//                 "created_at": 1493307153,
//                 "display_plural": "kosher salts",
//                 "id": 11,
//                 "display_singular": "kosher salt"
//               },
//               "id": 94625,
//               "position": 3,
//               "measurements": [
//                 {
//                   "id": 714576,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   },
//                   "quantity": "½"
//                 }
//               ],
//               "raw_text": "½ teaspoon kosher salt, plus more to taste"
//             },
//             {
//               "raw_text": "1 teaspoon dried Italian seasoning",
//               "extra_comment": "",
//               "ingredient": {
//                 "created_at": 1600182700,
//                 "display_plural": "dried Italian seasonings",
//                 "id": 6859,
//                 "display_singular": "dried Italian seasoning",
//                 "updated_at": 1600182700,
//                 "name": "dried Italian seasoning"
//               },
//               "id": 94626,
//               "position": 4,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   },
//                   "quantity": "1",
//                   "id": 714577
//                 }
//               ]
//             },
//             {
//               "id": 94627,
//               "position": 5,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   },
//                   "quantity": "½",
//                   "id": 714575
//                 }
//               ],
//               "raw_text": "½ teaspoon red pepper flakes, plus more to taste",
//               "extra_comment": "plus more to taste",
//               "ingredient": {
//                 "id": 351,
//                 "display_singular": "red pepper flake",
//                 "updated_at": 1509035267,
//                 "name": "red pepper flakes",
//                 "created_at": 1494885083,
//                 "display_plural": "red pepper flakes"
//               }
//             },
//             {
//               "ingredient": {
//                 "id": 95,
//                 "display_singular": "garlic",
//                 "updated_at": 1509035285,
//                 "name": "garlic",
//                 "created_at": 1493744766,
//                 "display_plural": "garlics"
//               },
//               "id": 94628,
//               "position": 6,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "clove",
//                     "system": "none",
//                     "name": "clove",
//                     "display_plural": "cloves",
//                     "display_singular": "clove"
//                   },
//                   "quantity": "3",
//                   "id": 714584
//                 }
//               ],
//               "raw_text": "3–4 garlic cloves, minced",
//               "extra_comment": "minced"
//             },
//             {
//               "position": 7,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "can",
//                     "system": "none",
//                     "name": "can",
//                     "display_plural": "cans",
//                     "display_singular": "can"
//                   },
//                   "quantity": "2",
//                   "id": 714578
//                 }
//               ],
//               "raw_text": "2 6-ounce cans of chopped clams, drained, ¼ cup clam juice reserved",
//               "extra_comment": "drained, 1/4 cup (60 ml) clam juice reserved",
//               "ingredient": {
//                 "id": 4916,
//                 "display_singular": "clam",
//                 "updated_at": 1542043658,
//                 "name": "clams",
//                 "created_at": 1542043658,
//                 "display_plural": "clams"
//               },
//               "id": 94629
//             },
//             {
//               "raw_text": "½ cup dry white wine, such as Sauvignon Blanc",
//               "extra_comment": "such as sauvignon Blanc",
//               "ingredient": {
//                 "updated_at": 1509035278,
//                 "name": "dry white wine",
//                 "created_at": 1494212849,
//                 "display_plural": "dry white wines",
//                 "id": 217,
//                 "display_singular": "dry white wine"
//               },
//               "id": 94630,
//               "position": 8,
//               "measurements": [
//                 {
//                   "id": 714586,
//                   "unit": {
//                     "system": "metric",
//                     "name": "milliliter",
//                     "display_plural": "mL",
//                     "display_singular": "mL",
//                     "abbreviation": "mL"
//                   },
//                   "quantity": "120"
//                 },
//                 {
//                   "unit": {
//                     "abbreviation": "c",
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup"
//                   },
//                   "quantity": "½",
//                   "id": 714585
//                 }
//               ]
//             },
//             {
//               "raw_text": "½ cup finely chopped fresh Italian parsley",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 3320,
//                 "display_singular": "fresh italian parsley",
//                 "updated_at": 1512184182,
//                 "name": "fresh italian parsley",
//                 "created_at": 1512184182,
//                 "display_plural": "fresh italian parsleys"
//               },
//               "id": 94631,
//               "position": 9,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "20",
//                   "id": 714588
//                 },
//                 {
//                   "unit": {
//                     "display_singular": "cup",
//                     "abbreviation": "c",
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups"
//                   },
//                   "quantity": "½",
//                   "id": 714587
//                 }
//               ]
//             },
//             {
//               "raw_text": "2 tablespoons salted butter",
//               "extra_comment": "",
//               "ingredient": {
//                 "created_at": 1495587107,
//                 "display_plural": "salted butters",
//                 "id": 675,
//                 "display_singular": "salted butter",
//                 "updated_at": 1509035242,
//                 "name": "salted butter"
//               },
//               "id": 94632,
//               "position": 10,
//               "measurements": [
//                 {
//                   "quantity": "2",
//                   "id": 714589,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp"
//                   }
//                 }
//               ]
//             },
//             {
//               "measurements": [
//                 {
//                   "unit": {
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric"
//                   },
//                   "quantity": "100",
//                   "id": 714583
//                 },
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "pound",
//                     "display_plural": "lb",
//                     "display_singular": "lb",
//                     "abbreviation": "lb"
//                   },
//                   "quantity": "½",
//                   "id": 714581
//                 }
//               ],
//               "raw_text": "½ pound dried linguine, cooked and drained",
//               "extra_comment": "cooked and drained",
//               "ingredient": {
//                 "updated_at": 1602944201,
//                 "name": "dried linguine",
//                 "created_at": 1602944201,
//                 "display_plural": "dried linguines",
//                 "id": 7128,
//                 "display_singular": "dried linguine"
//               },
//               "id": 94633,
//               "position": 11
//             },
//             {
//               "position": 12,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "0",
//                   "id": 714582
//                 }
//               ],
//               "raw_text": "Finishing olive oil, to taste",
//               "extra_comment": "to taste",
//               "ingredient": {
//                 "display_plural": "olive oils",
//                 "id": 4,
//                 "display_singular": "olive oil",
//                 "updated_at": 1509035290,
//                 "name": "olive oil",
//                 "created_at": 1493306183
//               },
//               "id": 94634
//             },
//             {
//               "raw_text": "Crusty bread, for serving",
//               "extra_comment": "for serving",
//               "ingredient": {
//                 "updated_at": 1509035160,
//                 "name": "crusty bread",
//                 "created_at": 1497274270,
//                 "display_plural": "crusty breads",
//                 "id": 1850,
//                 "display_singular": "crusty bread"
//               },
//               "id": 94635,
//               "position": 13,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "0",
//                   "id": 714579
//                 }
//               ]
//             },
//             {
//               "raw_text": "Lemon wedges, for serving",
//               "extra_comment": "for serving",
//               "ingredient": {
//                 "display_singular": "lemon wedge",
//                 "updated_at": 1526070227,
//                 "name": "lemon wedges",
//                 "created_at": 1526070227,
//                 "display_plural": "lemon wedges",
//                 "id": 4072
//               },
//               "id": 94636,
//               "position": 14,
//               "measurements": [
//                 {
//                   "id": 714580,
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "0"
//                 }
//               ]
//             }
//           ]
//         }
//       ],
//       "description": "This is the recipe for my dad’s clams linguine, or at least as close as memory allows. The canned clams, thanks to their affordability and convenience, make this dish an easy and inexpensive weeknight meal. It’s important not to skimp on the seasoning–this pasta should be bright, garlicky, and a little sweet from the clams. Serve with your favorite crusty bread for dipping!",
//       "video_id": 158811,
//       "brand": null,
//       "slug": "dougs-clams-linguine",
//       "prep_time_minutes": 15,
//       "brand_id": null,
//       "draft_status": "published",
//       "nutrition_visibility": "auto",
//       "facebook_posts": [],
//       "price": {
//         "portion": 450,
//         "consumption_total": 1400,
//         "consumption_portion": 350,
//         "total": 1750,
//         "updated_at": "2022-12-24T06:30:04+01:00"
//       },
//       "inspired_by_url": null,
//       "topics": [
//         {
//           "name": "Best Vegetarian",
//           "slug": "best-vegetarian"
//         },
//         {
//           "name": "Bread Lovers",
//           "slug": "bread"
//         },
//         {
//           "name": "One-Pot Recipes",
//           "slug": "one-pot"
//         },
//         {
//           "name": "Dinner",
//           "slug": "dinner"
//         },
//         {
//           "name": "Pasta",
//           "slug": "pasta"
//         },
//         {
//           "name": "Italian",
//           "slug": "italian"
//         }
//       ],
//       "canonical_id": "recipe:8261",
//       "approved_at": 1668632131,
//       "servings_noun_plural": "servings",
//       "instructions": [
//         {
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 71833,
//           "position": 1,
//           "display_text": "Heat the extra-virgin olive oil in a large skillet over medium heat until shimmering. Add the onion and season with salt. Cook for 2–3 minutes, until the onions are softened and translucent. Add the Italian seasoning, red pepper flakes, and garlic. Stir and cook for 1–2 minutes, until the garlic is fragrant."
//         },
//         {
//           "display_text": "Stir in the chopped clams, reserved clam juice, and white wine. Cook for 2–3 minutes, until the liquid is reduced by about half. Add the butter and parsley and swirl the pan until the butter is melted.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 71834,
//           "position": 2
//         },
//         {
//           "end_time": 0,
//           "temperature": null,
//           "id": 71835,
//           "position": 3,
//           "display_text": "Add the linguine to the pan and toss to combine until the pasta is well coated.",
//           "start_time": 0,
//           "appliance": null
//         },
//         {
//           "temperature": null,
//           "id": 71836,
//           "position": 4,
//           "display_text": "Divide the pasta between 4 bowls and drizzle with finishing olive oil, if desired. Season with more red pepper flakes. Serve with crusty bread and lemon wedges.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0
//         },
//         {
//           "end_time": 0,
//           "temperature": null,
//           "id": 71837,
//           "position": 5,
//           "display_text": "Enjoy!",
//           "start_time": 0,
//           "appliance": null
//         }
//       ],
//       "servings_noun_singular": "serving",
//       "credits": [
//         {
//           "name": "Karlee Rotoly",
//           "type": "internal"
//         },
//         {
//           "name": "Betsy Carter",
//           "type": "internal"
//         },
//         {
//           "name": "Karlee Rotoly",
//           "type": "internal"
//         }
//       ],
//       "name": "Doug’s Clams Linguine",
//       "aspect_ratio": "9:16",
//       "thumbnail_alt_text": "",
//       "num_servings": 4,
//       "buzz_id": null,
//       "thumbnail_url": "https://s3.amazonaws.com/video-api-prod/assets/8a7e994a197045bdb80239f68d4a5035/clamslinguine_reels.jpg",
//       "total_time_minutes": 30,
//       "video_url": "https://vid.tasty.co/output/242299/hls24_1654719428.m3u8",
//       "keywords": "",
//       "id": 8261,
//       "show_id": 17,
//       "updated_at": 1668632132,
//       "yields": "Servings: 4",
//       "promotion": "full"
//     },
//     {
//       "description": "",
//       "video_url": "https://vid.tasty.co/output/260191/hls24_1667224352.m3u8",
//       "renditions": [
//         {
//           "name": "mp4_720x720",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260191/square_720/1667224352_00001.png",
//           "duration": 200876,
//           "content_type": "video/mp4",
//           "aspect": "square",
//           "width": 720,
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "height": 720,
//           "container": "mp4",
//           "file_size": 49281926,
//           "url": "https://vid.tasty.co/output/260191/square_720/1667224352",
//           "bit_rate": 1963
//         },
//         {
//           "container": "mp4",
//           "aspect": "square",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260191/square_320/1667224352_00001.png",
//           "file_size": 16271857,
//           "url": "https://vid.tasty.co/output/260191/square_320/1667224352",
//           "duration": 200876,
//           "bit_rate": 649,
//           "content_type": "video/mp4",
//           "width": 320,
//           "minimum_bit_rate": null,
//           "name": "mp4_320x320",
//           "maximum_bit_rate": null,
//           "height": 320
//         },
//         {
//           "url": "https://vid.tasty.co/output/260191/landscape_720/1667224352",
//           "duration": 200876,
//           "bit_rate": 1964,
//           "width": 720,
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "file_size": 49305827,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260191/landscape_720/1667224352_00001.png",
//           "content_type": "video/mp4",
//           "aspect": "square",
//           "name": "mp4_720x720",
//           "height": 720,
//           "container": "mp4"
//         },
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260191/landscape_480/1667224352_00001.png",
//           "url": "https://vid.tasty.co/output/260191/landscape_480/1667224352",
//           "duration": 200876,
//           "bit_rate": 1103,
//           "content_type": "video/mp4",
//           "width": 480,
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "file_size": 27678109,
//           "aspect": "square",
//           "name": "mp4_480x480",
//           "height": 480
//         },
//         {
//           "content_type": "application/vnd.apple.mpegurl",
//           "height": 1080,
//           "container": "ts",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260191/1445289064805-h2exzu/1667224352_00001.png",
//           "file_size": null,
//           "duration": 200868,
//           "bit_rate": null,
//           "maximum_bit_rate": 3577,
//           "url": "https://vid.tasty.co/output/260191/hls24_1667224352.m3u8",
//           "aspect": "square",
//           "width": 1080,
//           "minimum_bit_rate": 274,
//           "name": "low"
//         }
//       ],
//       "seo_title": "",
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/0a3c987e4b864ba8bdf6dc540e291004/McCormick_DeliciousDollar_BFV95875_FB.mp4",
//       "show_id": 17,
//       "prep_time_minutes": null,
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "total_time_tier": {
//         "tier": "under_30_minutes",
//         "display_tier": "Under 30 minutes"
//       },
//       "video_ad_content": "co_branded",
//       "tags": [
//         {
//           "name": "desserts",
//           "id": 64485,
//           "display_name": "Desserts",
//           "type": "meal"
//         },
//         {
//           "id": 65850,
//           "display_name": "Indulgent Sweets",
//           "type": "occasion",
//           "name": "indulgent_sweets"
//         },
//         {
//           "name": "oven",
//           "id": 65846,
//           "display_name": "Oven",
//           "type": "appliance"
//         },
//         {
//           "name": "mixing_bowl",
//           "id": 1280510,
//           "display_name": "Mixing Bowl",
//           "type": "equipment"
//         },
//         {
//           "name": "whisk",
//           "id": 1247793,
//           "display_name": "Whisk",
//           "type": "equipment"
//         },
//         {
//           "id": 64472,
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty",
//           "name": "under_30_minutes"
//         },
//         {
//           "name": "american",
//           "id": 64444,
//           "display_name": "American",
//           "type": "cuisine"
//         },
//         {
//           "name": "thanksgiving",
//           "id": 64479,
//           "display_name": "Thanksgiving",
//           "type": "holiday"
//         },
//         {
//           "type": "cooking_style",
//           "name": "bake",
//           "id": 64492,
//           "display_name": "Bake"
//         },
//         {
//           "name": "special_occasion",
//           "id": 188967,
//           "display_name": "Special Occasion",
//           "type": "occasion"
//         }
//       ],
//       "draft_status": "published",
//       "thumbnail_alt_text": "",
//       "beauty_url": null,
//       "is_shoppable": false,
//       "keywords": "",
//       "user_ratings": {
//         "count_positive": 1,
//         "score": 0.5,
//         "count_negative": 1
//       },
//       "price": {
//         "portion": 350,
//         "consumption_total": 700,
//         "consumption_portion": 200,
//         "total": 1500,
//         "updated_at": "2022-12-24T06:30:53+01:00"
//       },
//       "approved_at": 1667422863,
//       "is_one_top": false,
//       "servings_noun_plural": "servings",
//       "canonical_id": "recipe:8536",
//       "cook_time_minutes": null,
//       "facebook_posts": [],
//       "brand_id": 3,
//       "total_time_minutes": null,
//       "promotion": "full",
//       "buzz_id": null,
//       "country": "US",
//       "instructions": [
//         {
//           "start_time": 0,
//           "appliance": "oven",
//           "end_time": 0,
//           "temperature": 400,
//           "id": 73743,
//           "position": 1,
//           "display_text": "Preheat the oven to 400°F (200°C). Grease a 9-inch round baking dish with ½ tablespoon of butter."
//         },
//         {
//           "start_time": 152000,
//           "appliance": null,
//           "end_time": 156166,
//           "temperature": null,
//           "id": 73744,
//           "position": 2,
//           "display_text": "In a medium bowl, whip the egg whites with an electric hand mixer on medium-high speed until stiff peaks form, 2–3 minutes."
//         },
//         {
//           "temperature": null,
//           "id": 73745,
//           "position": 3,
//           "display_text": "In a small, microwave-safe bowl, combine three-quarters of the chocolate bar with the remaining ½ tablespoon of butter. Microwave in 30-second intervals, stirring between, until melted and smooth.",
//           "start_time": 157000,
//           "appliance": null,
//           "end_time": 158833
//         },
//         {
//           "position": 4,
//           "display_text": "In a large bowl, whip together the egg yolks, brown sugar, and McCormick® Vanilla Extract with an electric hand mixer on medium speed until light and fluffy, about 2 minutes. Add the melted chocolate and flour and mix until smooth. Gently fold in the whipped egg whites with a rubber spatula until fully incorporated.",
//           "start_time": 159666,
//           "appliance": null,
//           "end_time": 171500,
//           "temperature": null,
//           "id": 73746
//         },
//         {
//           "temperature": null,
//           "id": 73747,
//           "position": 5,
//           "display_text": "Pour the batter into the prepared baking dish and press the remaining quarter of the chocolate bar into the center of the pudding.",
//           "start_time": 173000,
//           "appliance": null,
//           "end_time": 174500
//         },
//         {
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 73748,
//           "position": 6,
//           "display_text": "Bake the pudding for 6 minutes, until the edges are cooked but the center is still gooey."
//         },
//         {
//           "display_text": "Remove the pudding from the oven and scoop vanilla ice cream onto the center, if desired. Serve warm.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 73749,
//           "position": 7
//         },
//         {
//           "end_time": 193666,
//           "temperature": null,
//           "id": 73750,
//           "position": 8,
//           "display_text": "Enjoy!",
//           "start_time": 192333,
//           "appliance": null
//         }
//       ],
//       "name": "Molten Brownie Pudding",
//       "compilations": [
//         {
//           "video_id": 168442,
//           "keywords": null,
//           "draft_status": "published",
//           "canonical_id": "compilation:3360",
//           "description": null,
//           "id": 3360,
//           "beauty_url": null,
//           "slug": "alvin-s-holiday-meal-on-a-budget-fb",
//           "promotion": "full",
//           "aspect_ratio": "1:1",
//           "is_shoppable": false,
//           "show": [
//             {
//               "name": "Tasty",
//               "id": 17
//             }
//           ],
//           "approved_at": 1667423975,
//           "buzz_id": null,
//           "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/407956.jpg",
//           "thumbnail_alt_text": "",
//           "video_url": "https://vid.tasty.co/output/260191/hls24_1667224352.m3u8",
//           "language": "eng",
//           "name": "Alvin's Holiday Meal on a Budget",
//           "country": "US",
//           "facebook_posts": [],
//           "created_at": 1667402091
//         }
//       ],
//       "num_servings": 4,
//       "topics": [
//         {
//           "name": "Thanksgiving",
//           "slug": "thanksgiving"
//         },
//         {
//           "name": "Desserts",
//           "slug": "desserts"
//         },
//         {
//           "name": "American",
//           "slug": "american"
//         }
//       ],
//       "language": "eng",
//       "id": 8536,
//       "slug": "molten-brownie-pudding",
//       "inspired_by_url": null,
//       "yields": "Servings: 4",
//       "video_id": 168442,
//       "brand": {
//         "slug": "mccormick",
//         "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/brands/01aefa61116d402f98d08e9903834abc.png",
//         "name": "McCormick",
//         "id": 3
//       },
//       "servings_noun_singular": "serving",
//       "sections": [
//         {
//           "components": [
//             {
//               "raw_text": "1 tablespoon unsalted butter, room temperature, divided",
//               "extra_comment": "room temperature, divided",
//               "ingredient": {
//                 "id": 291,
//                 "display_singular": "unsalted butter",
//                 "updated_at": 1509035272,
//                 "name": "unsalted butter",
//                 "created_at": 1494806355,
//                 "display_plural": "unsalted butters"
//               },
//               "id": 97753,
//               "position": 1,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons"
//                   },
//                   "quantity": "1",
//                   "id": 713198
//                 }
//               ]
//             },
//             {
//               "id": 97754,
//               "position": 2,
//               "measurements": [
//                 {
//                   "id": 713200,
//                   "unit": {
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": "",
//                     "display_plural": ""
//                   },
//                   "quantity": "3"
//                 }
//               ],
//               "raw_text": "3 large eggs, whites and yolks separated",
//               "extra_comment": "whites and yolks separated",
//               "ingredient": {
//                 "display_plural": "large eggs",
//                 "id": 253,
//                 "display_singular": "large egg",
//                 "updated_at": 1509035275,
//                 "name": "large egg",
//                 "created_at": 1494382414
//               }
//             },
//             {
//               "raw_text": "¼ cup light brown sugar",
//               "extra_comment": "",
//               "ingredient": {
//                 "created_at": 1495671124,
//                 "display_plural": "light brown sugars",
//                 "id": 707,
//                 "display_singular": "light brown sugar",
//                 "updated_at": 1509035239,
//                 "name": "light brown sugar"
//               },
//               "id": 97755,
//               "position": 3,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   },
//                   "quantity": "¼",
//                   "id": 713205
//                 },
//                 {
//                   "unit": {
//                     "abbreviation": "g",
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g"
//                   },
//                   "quantity": "50",
//                   "id": 713204
//                 }
//               ]
//             },
//             {
//               "position": 4,
//               "measurements": [
//                 {
//                   "quantity": "½",
//                   "id": 713197,
//                   "unit": {
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon"
//                   }
//                 }
//               ],
//               "raw_text": "½ tablespoon McCormick® Vanilla Extract",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_plural": "McCormick® vanilla extracts",
//                 "id": 5071,
//                 "display_singular": "McCormick® vanilla extract",
//                 "updated_at": 1548772424,
//                 "name": "McCormick® vanilla extract",
//                 "created_at": 1548772424
//               },
//               "id": 97756
//             },
//             {
//               "raw_text": "1 3.5-ounce bar of 70% chocolate, divided",
//               "extra_comment": "divided, 70%",
//               "ingredient": {
//                 "updated_at": 1509035286,
//                 "name": "chocolate",
//                 "created_at": 1493430412,
//                 "display_plural": "chocolates",
//                 "id": 60,
//                 "display_singular": "chocolate"
//               },
//               "id": 97757,
//               "position": 5,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "bar",
//                     "display_plural": "bars",
//                     "display_singular": "bar",
//                     "abbreviation": "bar"
//                   },
//                   "quantity": "1",
//                   "id": 713203
//                 },
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "ounce",
//                     "display_plural": "oz",
//                     "display_singular": "oz",
//                     "abbreviation": "oz"
//                   },
//                   "quantity": "3.5",
//                   "id": 713202
//                 },
//                 {
//                   "id": 713201,
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "100"
//                 }
//               ]
//             },
//             {
//               "ingredient": {
//                 "display_plural": "all-purpose flours",
//                 "id": 185,
//                 "display_singular": "all-purpose flour",
//                 "updated_at": 1509035280,
//                 "name": "all-purpose flour",
//                 "created_at": 1494122348
//               },
//               "id": 97758,
//               "position": 6,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon"
//                   },
//                   "quantity": "1",
//                   "id": 713199
//                 }
//               ],
//               "raw_text": "1 tablespoon all-purpose flour",
//               "extra_comment": ""
//             },
//             {
//               "raw_text": "Vanilla ice cream, for serving (optional)",
//               "extra_comment": "for serving (optional)",
//               "ingredient": {
//                 "created_at": 1494122620,
//                 "display_plural": "vanilla ice creams",
//                 "id": 190,
//                 "display_singular": "vanilla ice cream",
//                 "updated_at": 1509035280,
//                 "name": "vanilla ice cream"
//               },
//               "id": 97759,
//               "position": 7,
//               "measurements": [
//                 {
//                   "unit": {
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none"
//                   },
//                   "quantity": "0",
//                   "id": 713196
//                 }
//               ]
//             }
//           ],
//           "name": null,
//           "position": 1
//         }
//       ],
//       "aspect_ratio": "1:1",
//       "created_at": 1667402121,
//       "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/407956.jpg",
//       "updated_at": 1667422864,
//       "credits": [
//         {
//           "type": "brand",
//           "slug": "mccormick",
//           "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/brands/01aefa61116d402f98d08e9903834abc.png",
//           "name": "McCormick",
//           "id": 3
//         }
//       ],
//       "nutrition_visibility": "auto",
//       "nutrition": {
//         "carbohydrates": 25,
//         "fiber": 0,
//         "updated_at": "2022-11-04T07:01:48+01:00",
//         "protein": 8,
//         "fat": 14,
//         "calories": 269,
//         "sugar": 21
//       },
//       "tips_and_ratings_enabled": true
//     },
//     {
//       "nutrition_visibility": "auto",
//       "num_servings": 4,
//       "tips_and_ratings_enabled": true,
//       "description": "Treat yourself to these indulgent apples in just 15 minutes or less, thanks to GEICO!",
//       "approved_at": 1667249582,
//       "topics": [
//         {
//           "name": "Fall Recipes",
//           "slug": "fall"
//         },
//         {
//           "name": "Desserts",
//           "slug": "desserts"
//         },
//         {
//           "name": "American",
//           "slug": "american"
//         }
//       ],
//       "video_ad_content": "co_branded",
//       "user_ratings": {
//         "count_positive": 3,
//         "score": 1,
//         "count_negative": 0
//       },
//       "compilations": [],
//       "show": {
//         "id": 17,
//         "name": "Tasty"
//       },
//       "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/407789.jpg",
//       "canonical_id": "recipe:8524",
//       "country": "US",
//       "instructions": [
//         {
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 73645,
//           "position": 1,
//           "display_text": "Preheat the air fryer to 350°F (180°C).",
//           "start_time": 0
//         },
//         {
//           "appliance": null,
//           "end_time": 17483,
//           "temperature": null,
//           "id": 73646,
//           "position": 2,
//           "display_text": "Cut the apples in half through the stems, then use a spoon to scoop out the core and seeds.",
//           "start_time": 9000
//         },
//         {
//           "id": 73647,
//           "position": 3,
//           "display_text": "In a small bowl, mix together the maple syrup, melted coconut oil, cinnamon, nutmeg, and ginger.",
//           "start_time": 18000,
//           "appliance": null,
//           "end_time": 26833,
//           "temperature": null
//         },
//         {
//           "end_time": 38166,
//           "temperature": null,
//           "id": 73648,
//           "position": 4,
//           "display_text": "Brush the apples all over with the spice oil, spooning any remaining oil into the hollow cores.",
//           "start_time": 28000,
//           "appliance": null
//         },
//         {
//           "position": 5,
//           "display_text": "Set the apples, cut-side up, in the air fryer basket and cook until tender and the tops are golden brown, about 8 minutes.",
//           "start_time": 39333,
//           "appliance": null,
//           "end_time": 44816,
//           "temperature": null,
//           "id": 73649
//         },
//         {
//           "position": 6,
//           "display_text": "Meanwhile, make the crumble topping: In a small bowl, mix together the oats, flour, raisins, melted coconut oil, maple syrup, cinnamon, nutmeg, ginger, and salt.",
//           "start_time": 47000,
//           "appliance": null,
//           "end_time": 64333,
//           "temperature": null,
//           "id": 73650
//         },
//         {
//           "temperature": null,
//           "id": 73651,
//           "position": 7,
//           "display_text": "Spoon the crumble topping into the center of each apple half, dividing evenly. Air-fry for another 1–2 minutes, or until the crumble is golden brown.",
//           "start_time": 67000,
//           "appliance": null,
//           "end_time": 74166
//         },
//         {
//           "position": 8,
//           "display_text": "Transfer the apples to plates and serve warm with vanilla ice cream, a drizzle of caramel sauce, and a dusting of ground cinnamon.",
//           "start_time": 77000,
//           "appliance": null,
//           "end_time": 83333,
//           "temperature": null,
//           "id": 73652
//         },
//         {
//           "temperature": null,
//           "id": 73653,
//           "position": 9,
//           "display_text": "Enjoy!",
//           "start_time": 86000,
//           "appliance": null,
//           "end_time": 87666
//         }
//       ],
//       "price": {
//         "total": 1600,
//         "updated_at": "2022-12-24T06:30:51+01:00",
//         "portion": 400,
//         "consumption_total": 400,
//         "consumption_portion": 100
//       },
//       "slug": "air-fryer-spiced-apples-in-15-minutes-or-less",
//       "servings_noun_singular": "serving",
//       "beauty_url": null,
//       "is_shoppable": false,
//       "yields": "Servings: 4",
//       "id": 8524,
//       "brand": {
//         "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/e7932d4a44d44548818b6ecddea97810.jpeg",
//         "name": "Geico",
//         "id": 41,
//         "slug": "geico"
//       },
//       "tags": [
//         {
//           "name": "desserts",
//           "id": 64485,
//           "display_name": "Desserts",
//           "type": "meal"
//         },
//         {
//           "name": "easy",
//           "id": 64471,
//           "display_name": "Easy",
//           "type": "difficulty"
//         },
//         {
//           "display_name": "Air Fryer",
//           "type": "appliance",
//           "name": "air_fryer",
//           "id": 6931167
//         },
//         {
//           "name": "under_15_minutes",
//           "id": 8091744,
//           "display_name": "Under 15 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "ice_cream_scoop",
//           "id": 1247772,
//           "display_name": "Ice Cream Scoop",
//           "type": "equipment"
//         },
//         {
//           "type": "seasonal",
//           "name": "fall",
//           "id": 64508,
//           "display_name": "Fall"
//         },
//         {
//           "name": "american",
//           "id": 64444,
//           "display_name": "American",
//           "type": "cuisine"
//         },
//         {
//           "id": 64472,
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty",
//           "name": "under_30_minutes"
//         },
//         {
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty",
//           "name": "under_45_minutes",
//           "id": 8091747
//         },
//         {
//           "name": "under_1_hour",
//           "id": 8091748,
//           "display_name": "Under 1 Hour",
//           "type": "difficulty"
//         }
//       ],
//       "nutrition": {
//         "fat": 11,
//         "calories": 318,
//         "sugar": 29,
//         "carbohydrates": 53,
//         "fiber": 8,
//         "updated_at": "2022-11-02T07:01:33+01:00",
//         "protein": 3
//       },
//       "name": "Air Fryer Spiced Apples In 15 Minutes Or Less",
//       "inspired_by_url": null,
//       "total_time_tier": null,
//       "language": "eng",
//       "prep_time_minutes": 5,
//       "video_url": "https://vid.tasty.co/output/260222/hls24_1667236499.m3u8",
//       "servings_noun_plural": "servings",
//       "cook_time_minutes": 10,
//       "aspect_ratio": "1:1",
//       "thumbnail_alt_text": "",
//       "renditions": [
//         {
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260222/square_720/1667236499_00001.png",
//           "bit_rate": 2079,
//           "content_type": "video/mp4",
//           "width": 720,
//           "minimum_bit_rate": null,
//           "name": "mp4_720x720",
//           "file_size": 25078076,
//           "url": "https://vid.tasty.co/output/260222/square_720/1667236499",
//           "duration": 96526,
//           "aspect": "square",
//           "height": 720
//         },
//         {
//           "minimum_bit_rate": null,
//           "file_size": 8701406,
//           "duration": 96526,
//           "url": "https://vid.tasty.co/output/260222/square_320/1667236499",
//           "bit_rate": 722,
//           "content_type": "video/mp4",
//           "aspect": "square",
//           "width": 320,
//           "name": "mp4_320x320",
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260222/square_320/1667236499_00001.png",
//           "maximum_bit_rate": null,
//           "height": 320
//         },
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260222/landscape_720/1667236499_00001.png",
//           "bit_rate": 2077,
//           "minimum_bit_rate": null,
//           "name": "mp4_720x720",
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "url": "https://vid.tasty.co/output/260222/landscape_720/1667236499",
//           "duration": 96526,
//           "content_type": "video/mp4",
//           "aspect": "square",
//           "width": 720,
//           "height": 720,
//           "file_size": 25055735
//         },
//         {
//           "container": "mp4",
//           "file_size": 14729134,
//           "content_type": "video/mp4",
//           "aspect": "square",
//           "minimum_bit_rate": null,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260222/landscape_480/1667236499_00001.png",
//           "url": "https://vid.tasty.co/output/260222/landscape_480/1667236499",
//           "duration": 96526,
//           "bit_rate": 1221,
//           "width": 480,
//           "name": "mp4_480x480",
//           "maximum_bit_rate": null,
//           "height": 480
//         },
//         {
//           "height": 1080,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/260222/1445289064805-h2exzu/1667236499_00001.png",
//           "bit_rate": null,
//           "aspect": "square",
//           "maximum_bit_rate": 3556,
//           "content_type": "application/vnd.apple.mpegurl",
//           "width": 1080,
//           "minimum_bit_rate": 272,
//           "name": "low",
//           "container": "ts",
//           "file_size": null,
//           "url": "https://vid.tasty.co/output/260222/hls24_1667236499.m3u8",
//           "duration": 96514
//         }
//       ],
//       "promotion": "full",
//       "show_id": 17,
//       "sections": [
//         {
//           "name": "Ingredients",
//           "position": 1,
//           "components": [
//             {
//               "id": 97567,
//               "position": 2,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "2",
//                   "id": 712098
//                 }
//               ],
//               "raw_text": "2 Granny Smith apples",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_plural": "granny smith apples",
//                 "id": 189,
//                 "display_singular": "granny smith apple",
//                 "updated_at": 1509035280,
//                 "name": "granny smith apples",
//                 "created_at": 1494122609
//               }
//             },
//             {
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c",
//                     "system": "imperial",
//                     "name": "cup"
//                   },
//                   "quantity": "¼",
//                   "id": 712095
//                 },
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "60",
//                   "id": 712094
//                 }
//               ],
//               "raw_text": "¼ cup maple syrup",
//               "extra_comment": "",
//               "ingredient": {
//                 "created_at": 1494966352,
//                 "display_plural": "maple syrups",
//                 "id": 359,
//                 "display_singular": "maple syrup",
//                 "updated_at": 1509035267,
//                 "name": "maple syrup"
//               },
//               "id": 97568,
//               "position": 3
//             },
//             {
//               "raw_text": "1½ tablespoons melted coconut oil",
//               "extra_comment": "melted",
//               "ingredient": {
//                 "updated_at": 1509035268,
//                 "name": "coconut oil",
//                 "created_at": 1494881209,
//                 "display_plural": "coconut oils",
//                 "id": 341,
//                 "display_singular": "coconut oil"
//               },
//               "id": 97569,
//               "position": 4,
//               "measurements": [
//                 {
//                   "quantity": "1 ½",
//                   "id": 712096,
//                   "unit": {
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons"
//                   }
//                 }
//               ]
//             },
//             {
//               "raw_text": "½ teaspoon ground cinnamon",
//               "extra_comment": "",
//               "ingredient": {
//                 "created_at": 1494985113,
//                 "display_plural": "ground cinnamons",
//                 "id": 407,
//                 "display_singular": "ground cinnamon",
//                 "updated_at": 1509035263,
//                 "name": "ground cinnamon"
//               },
//               "id": 97570,
//               "position": 5,
//               "measurements": [
//                 {
//                   "quantity": "½",
//                   "id": 712109,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   }
//                 }
//               ]
//             },
//             {
//               "ingredient": {
//                 "updated_at": 1509035261,
//                 "name": "ground nutmeg",
//                 "created_at": 1495053759,
//                 "display_plural": "ground nutmegs",
//                 "id": 429,
//                 "display_singular": "ground nutmeg"
//               },
//               "id": 97571,
//               "position": 6,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   },
//                   "quantity": "¼",
//                   "id": 712097
//                 }
//               ],
//               "raw_text": "¼ teaspoon ground nutmeg",
//               "extra_comment": ""
//             },
//             {
//               "raw_text": "¼ teaspoon ground ginger",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 876,
//                 "display_singular": "ground ginger",
//                 "updated_at": 1509035226,
//                 "name": "ground ginger",
//                 "created_at": 1495927686,
//                 "display_plural": "ground gingers"
//               },
//               "id": 97572,
//               "position": 7,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "tsp",
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon"
//                   },
//                   "quantity": "¼",
//                   "id": 712101
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "components": [
//             {
//               "raw_text": "½ cup rolled oats",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035275,
//                 "name": "rolled oats",
//                 "created_at": 1494623487,
//                 "display_plural": "rolled oats",
//                 "id": 261,
//                 "display_singular": "rolled oat"
//               },
//               "id": 97574,
//               "position": 9,
//               "measurements": [
//                 {
//                   "quantity": "½",
//                   "id": 712105,
//                   "unit": {
//                     "abbreviation": "c",
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup"
//                   }
//                 },
//                 {
//                   "unit": {
//                     "abbreviation": "g",
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g"
//                   },
//                   "quantity": "40",
//                   "id": 712103
//                 }
//               ]
//             },
//             {
//               "position": 10,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp"
//                   },
//                   "quantity": "2",
//                   "id": 712100
//                 }
//               ],
//               "raw_text": "2 tablespoons all-purpose flour",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_plural": "all purpose flours",
//                 "id": 3393,
//                 "display_singular": "all purpose flour",
//                 "updated_at": 1513187920,
//                 "name": "all purpose flour",
//                 "created_at": 1513187920
//               },
//               "id": 97575
//             },
//             {
//               "position": 11,
//               "measurements": [
//                 {
//                   "quantity": "2",
//                   "id": 712104,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp"
//                   }
//                 }
//               ],
//               "raw_text": "2 tablespoons raisins",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035284,
//                 "name": "raisin",
//                 "created_at": 1493746390,
//                 "display_plural": "raisins",
//                 "id": 110,
//                 "display_singular": "raisin"
//               },
//               "id": 97576
//             },
//             {
//               "raw_text": "2 tablespoons melted coconut oil",
//               "extra_comment": "melted",
//               "ingredient": {
//                 "updated_at": 1509035268,
//                 "name": "coconut oil",
//                 "created_at": 1494881209,
//                 "display_plural": "coconut oils",
//                 "id": 341,
//                 "display_singular": "coconut oil"
//               },
//               "id": 97577,
//               "position": 12,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon"
//                   },
//                   "quantity": "2",
//                   "id": 712112
//                 }
//               ]
//             },
//             {
//               "position": 13,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp"
//                   },
//                   "quantity": "2",
//                   "id": 712099
//                 }
//               ],
//               "raw_text": "2 tablespoons maple syrup",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 359,
//                 "display_singular": "maple syrup",
//                 "updated_at": 1509035267,
//                 "name": "maple syrup",
//                 "created_at": 1494966352,
//                 "display_plural": "maple syrups"
//               },
//               "id": 97578
//             },
//             {
//               "raw_text": "1 teaspoon ground cinnamon",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035263,
//                 "name": "ground cinnamon",
//                 "created_at": 1494985113,
//                 "display_plural": "ground cinnamons",
//                 "id": 407,
//                 "display_singular": "ground cinnamon"
//               },
//               "id": 97579,
//               "position": 14,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   },
//                   "quantity": "1",
//                   "id": 712108
//                 }
//               ]
//             },
//             {
//               "raw_text": "¼ teaspoon ground nutmeg",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_singular": "ground nutmeg",
//                 "updated_at": 1509035261,
//                 "name": "ground nutmeg",
//                 "created_at": 1495053759,
//                 "display_plural": "ground nutmegs",
//                 "id": 429
//               },
//               "id": 97580,
//               "position": 15,
//               "measurements": [
//                 {
//                   "quantity": "¼",
//                   "id": 712106,
//                   "unit": {
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp",
//                     "system": "imperial",
//                     "name": "teaspoon"
//                   }
//                 }
//               ]
//             },
//             {
//               "position": 16,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "tsp",
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon"
//                   },
//                   "quantity": "¼",
//                   "id": 712107
//                 }
//               ],
//               "raw_text": "¼ teaspoon ground ginger",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035226,
//                 "name": "ground ginger",
//                 "created_at": 1495927686,
//                 "display_plural": "ground gingers",
//                 "id": 876,
//                 "display_singular": "ground ginger"
//               },
//               "id": 97581
//             },
//             {
//               "raw_text": "¼ teaspoon kosher salt",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035289,
//                 "name": "kosher salt",
//                 "created_at": 1493307153,
//                 "display_plural": "kosher salts",
//                 "id": 11,
//                 "display_singular": "kosher salt"
//               },
//               "id": 97582,
//               "position": 17,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   },
//                   "quantity": "¼",
//                   "id": 712102
//                 }
//               ]
//             },
//             {
//               "extra_comment": "for serving",
//               "ingredient": {
//                 "updated_at": 1509035280,
//                 "name": "vanilla ice cream",
//                 "created_at": 1494122620,
//                 "display_plural": "vanilla ice creams",
//                 "id": 190,
//                 "display_singular": "vanilla ice cream"
//               },
//               "id": 97583,
//               "position": 18,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "0",
//                   "id": 712110
//                 }
//               ],
//               "raw_text": "Vanilla ice cream, for serving"
//             },
//             {
//               "ingredient": {
//                 "updated_at": 1509035247,
//                 "name": "caramel sauce",
//                 "created_at": 1495476518,
//                 "display_plural": "caramel sauces",
//                 "id": 606,
//                 "display_singular": "caramel sauce"
//               },
//               "id": 97584,
//               "position": 19,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": ""
//                   },
//                   "quantity": "0",
//                   "id": 712111
//                 }
//               ],
//               "raw_text": "Caramel sauce, for serving",
//               "extra_comment": "for serving"
//             }
//           ],
//           "name": "Crumble Topping",
//           "position": 2
//         }
//       ],
//       "created_at": 1667236701,
//       "total_time_minutes": null,
//       "is_one_top": false,
//       "video_id": 172327,
//       "keywords": "",
//       "facebook_posts": [],
//       "brand_id": 41,
//       "buzz_id": null,
//       "draft_status": "published",
//       "updated_at": 1667249582,
//       "credits": [
//         {
//           "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/e7932d4a44d44548818b6ecddea97810.jpeg",
//           "name": "Geico",
//           "id": 41,
//           "type": "brand",
//           "slug": "geico"
//         }
//       ],
//       "seo_title": "",
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/f91f7ee2195245e28640ac9671112bee/GEICO_FriedFruit_BFV90138_SQHero.mp4"
//     },
//     {
//       "language": "eng",
//       "sections": [
//         {
//           "components": [
//             {
//               "measurements": [
//                 {
//                   "quantity": "4",
//                   "id": 709778,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp"
//                   }
//                 }
//               ],
//               "raw_text": "4 tablespoons unpopped popcorn kernels",
//               "extra_comment": "",
//               "ingredient": {
//                 "created_at": 1665666431,
//                 "display_plural": "unpopped popcorn kernels",
//                 "id": 10366,
//                 "display_singular": "unpopped popcorn kernel",
//                 "updated_at": 1665666431,
//                 "name": "unpopped popcorn kernels"
//               },
//               "id": 97287,
//               "position": 1
//             },
//             {
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon"
//                   },
//                   "quantity": "2",
//                   "id": 709776
//                 }
//               ],
//               "raw_text": "2 tablespoons salted butter, divided",
//               "extra_comment": "divided",
//               "ingredient": {
//                 "display_plural": "salted butters",
//                 "id": 675,
//                 "display_singular": "salted butter",
//                 "updated_at": 1509035242,
//                 "name": "salted butter",
//                 "created_at": 1495587107
//               },
//               "id": 97288,
//               "position": 2
//             },
//             {
//               "raw_text": "1 teaspoon green food coloring",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 1304,
//                 "display_singular": "green food coloring",
//                 "updated_at": 1509035195,
//                 "name": "green food coloring",
//                 "created_at": 1496678514,
//                 "display_plural": "green food colorings"
//               },
//               "id": 97289,
//               "position": 3,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp",
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons"
//                   },
//                   "quantity": "1",
//                   "id": 709781
//                 }
//               ]
//             },
//             {
//               "ingredient": {
//                 "display_singular": "granulated sugar",
//                 "updated_at": 1509035262,
//                 "name": "granulated sugar",
//                 "created_at": 1494989637,
//                 "display_plural": "granulated sugars",
//                 "id": 419
//               },
//               "id": 97290,
//               "position": 4,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp"
//                   },
//                   "quantity": "1",
//                   "id": 709784
//                 }
//               ],
//               "raw_text": "1 tablespoon granulated sugar",
//               "extra_comment": ""
//             },
//             {
//               "ingredient": {
//                 "updated_at": 1665666504,
//                 "name": "chocolate pieces",
//                 "created_at": 1665666504,
//                 "display_plural": "chocolate pieces",
//                 "id": 10367,
//                 "display_singular": "chocolate piece"
//               },
//               "id": 97291,
//               "position": 5,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c",
//                     "system": "imperial",
//                     "name": "cup"
//                   },
//                   "quantity": "⅓",
//                   "id": 709777
//                 },
//                 {
//                   "quantity": "65",
//                   "id": 709775,
//                   "unit": {
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric"
//                   }
//                 }
//               ],
//               "raw_text": "⅓ cup chocolate pieces",
//               "extra_comment": ""
//             },
//             {
//               "raw_text": "⅓ cup pretzel sticks",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 1190,
//                 "display_singular": "pretzel stick",
//                 "updated_at": 1509035202,
//                 "name": "pretzel stick",
//                 "created_at": 1496539925,
//                 "display_plural": "pretzel sticks"
//               },
//               "id": 97292,
//               "position": 6,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c",
//                     "system": "imperial",
//                     "name": "cup"
//                   },
//                   "quantity": "⅓",
//                   "id": 709780
//                 },
//                 {
//                   "unit": {
//                     "abbreviation": "g",
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g"
//                   },
//                   "quantity": "15",
//                   "id": 709779
//                 }
//               ]
//             },
//             {
//               "raw_text": "⅓ cup candy corn",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_singular": "candy corn",
//                 "updated_at": 1509035167,
//                 "name": "candy corn",
//                 "created_at": 1497035818,
//                 "display_plural": "candy corns",
//                 "id": 1752
//               },
//               "id": 97293,
//               "position": 7,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   },
//                   "quantity": "⅓",
//                   "id": 709786
//                 },
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "65",
//                   "id": 709785
//                 }
//               ]
//             },
//             {
//               "position": 8,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   },
//                   "quantity": "⅓",
//                   "id": 709783
//                 },
//                 {
//                   "unit": {
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric"
//                   },
//                   "quantity": "60",
//                   "id": 709782
//                 }
//               ],
//               "raw_text": "⅓ cup gummy worms",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035123,
//                 "name": "gummy worms",
//                 "created_at": 1500847784,
//                 "display_plural": "gummy worms",
//                 "id": 2526,
//                 "display_singular": "gummy worm"
//               },
//               "id": 97294
//             }
//           ],
//           "name": null,
//           "position": 1
//         }
//       ],
//       "beauty_url": null,
//       "seo_title": "Halloween Popcorn",
//       "canonical_id": "recipe:8504",
//       "country": "US",
//       "slug": "halloween-candy-popcorn",
//       "prep_time_minutes": 2,
//       "compilations": [],
//       "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/404698.jpg",
//       "video_ad_content": "none",
//       "instructions": [
//         {
//           "start_time": 3000,
//           "appliance": null,
//           "end_time": 5666,
//           "temperature": null,
//           "id": 73448,
//           "position": 1,
//           "display_text": "Add the popcorn kernels to the bowl of the Tasty Popcorn Popper. Cover, then add 1 tablespoon of the butter to the lid."
//         },
//         {
//           "start_time": 6833,
//           "appliance": null,
//           "end_time": 7483,
//           "temperature": null,
//           "id": 73449,
//           "position": 2,
//           "display_text": "Microwave for 2½–3 minutes, or until there are a few seconds between pops. Remove from the microwave and let cool for 5 minutes."
//         },
//         {
//           "temperature": null,
//           "id": 73450,
//           "position": 3,
//           "display_text": "In a microwave-safe bowl, microwave the remaining tablespoon of butter for about 30 seconds, until melted. Add the green food coloring and sugar and mix well.",
//           "start_time": 7983,
//           "appliance": null,
//           "end_time": 13133
//         },
//         {
//           "display_text": "Pour the green butter into the popper bowl while shaking to distribute evenly.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 73451,
//           "position": 4
//         },
//         {
//           "id": 73452,
//           "position": 5,
//           "display_text": "Add the candy corn, pretzel sticks, chocolate pieces and gummy worms to the popcorn. Cover with the lid again and shake to distribute the candy.",
//           "start_time": 13500,
//           "appliance": null,
//           "end_time": 18500,
//           "temperature": null
//         },
//         {
//           "temperature": null,
//           "id": 73453,
//           "position": 6,
//           "display_text": "Serve immediately.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0
//         },
//         {
//           "end_time": 2166,
//           "temperature": null,
//           "id": 73454,
//           "position": 7,
//           "display_text": "Enjoy!",
//           "start_time": 0,
//           "appliance": null
//         }
//       ],
//       "user_ratings": {
//         "count_positive": 17,
//         "score": 1,
//         "count_negative": 0
//       },
//       "brand": null,
//       "show_id": 17,
//       "name": "Halloween Candy Popcorn",
//       "buzz_id": null,
//       "servings_noun_plural": "servings",
//       "is_shoppable": true,
//       "nutrition_visibility": "auto",
//       "promotion": "full",
//       "cook_time_minutes": 3,
//       "servings_noun_singular": "serving",
//       "brand_id": null,
//       "thumbnail_alt_text": "",
//       "total_time_tier": {
//         "tier": "under_15_minutes",
//         "display_tier": "Under 15 minutes"
//       },
//       "video_id": 169968,
//       "keywords": "",
//       "description": "This Halloween candy popcorn mix is perfect for your next Hallo-Fest or spooky movie night. Using the Tasty Popcorn Popper makes this a super easy and fun snack. It’s the perfect way to use up leftover Halloween candy!",
//       "total_time_minutes": 5,
//       "video_url": "https://vid.tasty.co/output/257644/hls24_1665610222.m3u8",
//       "topics": [
//         {
//           "name": "Best Vegetarian",
//           "slug": "best-vegetarian"
//         },
//         {
//           "name": "Fall Recipes",
//           "slug": "fall"
//         },
//         {
//           "name": "Halloween",
//           "slug": "halloween"
//         },
//         {
//           "name": "New Years Party",
//           "slug": "new-years"
//         },
//         {
//           "slug": "snacks",
//           "name": "Snacks"
//         }
//       ],
//       "price": {
//         "total": 500,
//         "updated_at": "2022-12-24T06:30:46+01:00",
//         "portion": 150,
//         "consumption_total": 100,
//         "consumption_portion": 0
//       },
//       "tags": [
//         {
//           "name": "halloween",
//           "id": 64476,
//           "display_name": "Halloween",
//           "type": "holiday"
//         },
//         {
//           "name": "under_15_minutes",
//           "id": 8091744,
//           "display_name": "Under 15 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "snacks",
//           "id": 64491,
//           "display_name": "Snacks",
//           "type": "meal"
//         },
//         {
//           "type": "difficulty",
//           "name": "easy",
//           "id": 64471,
//           "display_name": "Easy"
//         },
//         {
//           "name": "microwave",
//           "id": 65845,
//           "display_name": "Microwave",
//           "type": "appliance"
//         },
//         {
//           "name": "happy_hour",
//           "id": 64502,
//           "display_name": "Happy Hour",
//           "type": "occasion"
//         },
//         {
//           "display_name": "Casual Party",
//           "type": "occasion",
//           "name": "casual_party",
//           "id": 64503
//         },
//         {
//           "display_name": "Fall",
//           "type": "seasonal",
//           "name": "fall",
//           "id": 64508
//         },
//         {
//           "type": "difficulty",
//           "name": "under_30_minutes",
//           "id": 64472,
//           "display_name": "Under 30 Minutes"
//         },
//         {
//           "name": "under_45_minutes",
//           "id": 8091747,
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_1_hour",
//           "id": 8091748,
//           "display_name": "Under 1 Hour",
//           "type": "difficulty"
//         },
//         {
//           "id": 64469,
//           "display_name": "Vegetarian",
//           "type": "dietary",
//           "name": "vegetarian"
//         }
//       ],
//       "num_servings": 4,
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "created_at": 1665610440,
//       "draft_status": "published",
//       "updated_at": 1665676091,
//       "renditions": [
//         {
//           "aspect": "portrait",
//           "maximum_bit_rate": null,
//           "url": "https://vid.tasty.co/output/257644/square_720/1665610222",
//           "bit_rate": 1632,
//           "content_type": "video/mp4",
//           "duration": 19812,
//           "width": 404,
//           "minimum_bit_rate": null,
//           "name": "mp4_404x720",
//           "height": 720,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/257644/square_720/1665610222_00001.png",
//           "file_size": 4039542
//         },
//         {
//           "bit_rate": 624,
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "name": "mp4_180x320",
//           "height": 320,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/257644/square_320/1665610222_00001.png",
//           "url": "https://vid.tasty.co/output/257644/square_320/1665610222",
//           "duration": 19812,
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "file_size": 1543919,
//           "width": 180
//         },
//         {
//           "bit_rate": 1631,
//           "aspect": "portrait",
//           "name": "mp4_404x720",
//           "height": 720,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/257644/landscape_720/1665610222_00001.png",
//           "url": "https://vid.tasty.co/output/257644/landscape_720/1665610222",
//           "width": 404,
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "file_size": 4038218,
//           "duration": 19812,
//           "content_type": "video/mp4"
//         },
//         {
//           "maximum_bit_rate": null,
//           "file_size": 2424975,
//           "url": "https://vid.tasty.co/output/257644/landscape_480/1665610222",
//           "duration": 19812,
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/257644/landscape_480/1665610222_00001.png",
//           "bit_rate": 980,
//           "width": 270,
//           "name": "mp4_270x480",
//           "height": 480
//         },
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/257644/1445289064805-h2exzu/1665610222_00001.png",
//           "url": "https://vid.tasty.co/output/257644/hls24_1665610222.m3u8",
//           "duration": 19854,
//           "content_type": "application/vnd.apple.mpegurl",
//           "aspect": "portrait",
//           "minimum_bit_rate": 279,
//           "name": "low",
//           "container": "ts",
//           "file_size": null,
//           "bit_rate": null,
//           "width": 608,
//           "maximum_bit_rate": 2591,
//           "height": 1080
//         }
//       ],
//       "id": 8504,
//       "nutrition": {},
//       "aspect_ratio": "9:16",
//       "approved_at": 1665676090,
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/38a06926e5d9407d8b343fa76d477a09/IMG_9993.mp4",
//       "facebook_posts": [],
//       "inspired_by_url": null,
//       "credits": [
//         {
//           "type": "internal",
//           "name": "Ivanna Lopez Guajardo"
//         }
//       ],
//       "is_one_top": false,
//       "yields": "Servings: 4",
//       "tips_and_ratings_enabled": true
//     },
//     {
//       "cook_time_minutes": null,
//       "nutrition_visibility": "auto",
//       "slug": "crispy-parmesan-green-beans",
//       "servings_noun_singular": "serving",
//       "brand_id": 115,
//       "credits": [
//         {
//           "name": "Birds Eye",
//           "id": 115,
//           "type": "brand",
//           "slug": "birds-eye",
//           "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/980c12d0123547f7af57dabec79f2e09.jpeg"
//         }
//       ],
//       "approved_at": 1664820449,
//       "topics": [
//         {
//           "name": "BBQ Season",
//           "slug": "bbq"
//         },
//         {
//           "name": "Best Vegetarian",
//           "slug": "best-vegetarian"
//         },
//         {
//           "name": "Bread Lovers",
//           "slug": "bread"
//         }
//       ],
//       "price": {
//         "updated_at": "2022-12-24T06:30:45+01:00",
//         "portion": 200,
//         "consumption_total": 250,
//         "consumption_portion": 50,
//         "total": 700
//       },
//       "show_id": 17,
//       "aspect_ratio": "1:1",
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "description": "",
//       "video_url": "https://vid.tasty.co/output/256065/hls24_1664492817.m3u8",
//       "is_one_top": false,
//       "keywords": "",
//       "brand": {
//         "name": "Birds Eye",
//         "id": 115,
//         "slug": "birds-eye",
//         "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/980c12d0123547f7af57dabec79f2e09.jpeg"
//       },
//       "buzz_id": null,
//       "thumbnail_alt_text": "",
//       "updated_at": 1664820450,
//       "instructions": [
//         {
//           "position": 1,
//           "display_text": "Preheat the oven to 400°F (200°C). Line a large baking sheet with parchment paper.",
//           "start_time": 0,
//           "appliance": "oven",
//           "end_time": 0,
//           "temperature": 400,
//           "id": 73418
//         },
//         {
//           "start_time": 109000,
//           "appliance": null,
//           "end_time": 116333,
//           "temperature": null,
//           "id": 73419,
//           "position": 2,
//           "display_text": "In a large bowl, stir together the Parmesan cheese, panko bread crumbs, flour, garlic powder, kosher salt, and cayenne pepper until combined."
//         },
//         {
//           "display_text": "In a separate large bowl, toss the Birds Eye Whole Green Beans with the olive oil until well-coated.",
//           "start_time": 118000,
//           "appliance": null,
//           "end_time": 121166,
//           "temperature": null,
//           "id": 73420,
//           "position": 3
//         },
//         {
//           "start_time": 122000,
//           "appliance": null,
//           "end_time": 127333,
//           "temperature": null,
//           "id": 73421,
//           "position": 4,
//           "display_text": "Add the green beans to the bread crumb mixture and toss to coat. They won’t be completely coated, but should have a good amount of the crumbs clinging to them."
//         },
//         {
//           "id": 73422,
//           "position": 5,
//           "display_text": "Spread the coated green beans evenly on the prepared baking sheet. Spray the green beans with the nonstick and sprinkle with flaky salt.",
//           "start_time": 129000,
//           "appliance": null,
//           "end_time": 138000,
//           "temperature": null
//         },
//         {
//           "id": 73423,
//           "position": 6,
//           "display_text": "Bake the green beans for 15 minutes before tossing gently and baking for another 5 minutes, or until the coating is crispy and the green beans are slightly browned.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null
//         },
//         {
//           "start_time": 140000,
//           "appliance": null,
//           "end_time": 142666,
//           "temperature": null,
//           "id": 73424,
//           "position": 7,
//           "display_text": "Remove from the oven and garnish with more Parmesan cheese. Serve immediately."
//         },
//         {
//           "start_time": 145000,
//           "appliance": null,
//           "end_time": 147000,
//           "temperature": null,
//           "id": 73425,
//           "position": 8,
//           "display_text": "Enjoy!"
//         }
//       ],
//       "sections": [
//         {
//           "components": [
//             {
//               "raw_text": "¼ cup finely grated Parmesan cheese, plus more for garnish",
//               "extra_comment": "plus more for garnish",
//               "ingredient": {
//                 "updated_at": 1509035109,
//                 "name": "finely grated parmesan cheese",
//                 "created_at": 1501634138,
//                 "display_plural": "finely grated parmesan cheeses",
//                 "id": 2785,
//                 "display_singular": "finely grated parmesan cheese"
//               },
//               "id": 97235,
//               "position": 1,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "25",
//                   "id": 709159
//                 },
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   },
//                   "quantity": "¼",
//                   "id": 709156
//                 }
//               ]
//             },
//             {
//               "extra_comment": "",
//               "ingredient": {
//                 "display_singular": "panko bread crumb",
//                 "updated_at": 1509035128,
//                 "name": "panko bread crumbs",
//                 "created_at": 1500680486,
//                 "display_plural": "panko bread crumbs",
//                 "id": 2438
//               },
//               "id": 97236,
//               "position": 2,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "g",
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g"
//                   },
//                   "quantity": "25",
//                   "id": 709162
//                 },
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   },
//                   "quantity": "¼",
//                   "id": 709158
//                 }
//               ],
//               "raw_text": "¼ cup panko bread crumbs"
//             },
//             {
//               "raw_text": "1½ teaspoons all-purpose flour",
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "all-purpose flour",
//                 "created_at": 1494122348,
//                 "display_plural": "all-purpose flours",
//                 "id": 185,
//                 "display_singular": "all-purpose flour",
//                 "updated_at": 1509035280
//               },
//               "id": 97237,
//               "position": 3,
//               "measurements": [
//                 {
//                   "id": 709155,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   },
//                   "quantity": "1 ½"
//                 }
//               ]
//             },
//             {
//               "id": 97238,
//               "position": 4,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "tsp",
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon"
//                   },
//                   "quantity": "½",
//                   "id": 709160
//                 }
//               ],
//               "raw_text": "½ teaspoon garlic powder",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035289,
//                 "name": "garlic powder",
//                 "created_at": 1493307128,
//                 "display_plural": "garlic powders",
//                 "id": 9,
//                 "display_singular": "garlic powder"
//               }
//             },
//             {
//               "ingredient": {
//                 "updated_at": 1509035289,
//                 "name": "kosher salt",
//                 "created_at": 1493307153,
//                 "display_plural": "kosher salts",
//                 "id": 11,
//                 "display_singular": "kosher salt"
//               },
//               "id": 97239,
//               "position": 5,
//               "measurements": [
//                 {
//                   "quantity": "¼",
//                   "id": 709167,
//                   "unit": {
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp",
//                     "system": "imperial"
//                   }
//                 }
//               ],
//               "raw_text": "¼ teaspoon kosher salt",
//               "extra_comment": ""
//             },
//             {
//               "ingredient": {
//                 "display_singular": "cayenne pepper",
//                 "updated_at": 1509035289,
//                 "name": "cayenne pepper",
//                 "created_at": 1493307142,
//                 "display_plural": "cayenne peppers",
//                 "id": 10
//               },
//               "id": 97240,
//               "position": 6,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "pinch",
//                     "display_plural": "pinches",
//                     "display_singular": "pinch",
//                     "abbreviation": "pinch"
//                   },
//                   "quantity": "1",
//                   "id": 709164
//                 }
//               ],
//               "raw_text": "Pinch of cayenne pepper",
//               "extra_comment": ""
//             },
//             {
//               "ingredient": {
//                 "name": "Birds Eye Whole Green Beans",
//                 "created_at": 1664496367,
//                 "display_plural": "Birds Eye Whole Green Beans",
//                 "id": 10353,
//                 "display_singular": "Birds Eye Whole Green Bean",
//                 "updated_at": 1664496367
//               },
//               "id": 97241,
//               "position": 7,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "225",
//                   "id": 709166
//                 },
//                 {
//                   "unit": {
//                     "name": "ounce",
//                     "display_plural": "oz",
//                     "display_singular": "oz",
//                     "abbreviation": "oz",
//                     "system": "imperial"
//                   },
//                   "quantity": "8",
//                   "id": 709165
//                 }
//               ],
//               "raw_text": "8 ounces Birds Eye Whole Green Beans, cooked according to package instructions and drained",
//               "extra_comment": "cooked according to package instructions and drained"
//             },
//             {
//               "raw_text": "1 tablespoon olive oil",
//               "extra_comment": "",
//               "ingredient": {
//                 "display_plural": "olive oils",
//                 "id": 4,
//                 "display_singular": "olive oil",
//                 "updated_at": 1509035290,
//                 "name": "olive oil",
//                 "created_at": 1493306183
//               },
//               "id": 97242,
//               "position": 8,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp",
//                     "system": "imperial",
//                     "name": "tablespoon"
//                   },
//                   "quantity": "1",
//                   "id": 709161
//                 }
//               ]
//             },
//             {
//               "extra_comment": "to taste",
//               "ingredient": {
//                 "created_at": 1507925704,
//                 "display_plural": "flaky sea salts",
//                 "id": 3099,
//                 "display_singular": "flaky sea salt",
//                 "updated_at": 1509035088,
//                 "name": "flaky sea salt"
//               },
//               "id": 97243,
//               "position": 9,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": ""
//                   },
//                   "quantity": "0",
//                   "id": 709157
//                 }
//               ],
//               "raw_text": "Flaky sea salt, to taste"
//             },
//             {
//               "raw_text": "Nonstick cooking spray, for greasing",
//               "extra_comment": "for greasing",
//               "ingredient": {
//                 "created_at": 1520176895,
//                 "display_plural": "nonstick cooking sprays",
//                 "id": 3826,
//                 "display_singular": "nonstick cooking spray",
//                 "updated_at": 1520176895,
//                 "name": "nonstick cooking spray"
//               },
//               "id": 97244,
//               "position": 10,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "0",
//                   "id": 709163
//                 }
//               ]
//             }
//           ],
//           "name": null,
//           "position": 1
//         }
//       ],
//       "created_at": 1664492867,
//       "draft_status": "published",
//       "total_time_minutes": 25,
//       "is_shoppable": false,
//       "prep_time_minutes": null,
//       "servings_noun_plural": "servings",
//       "renditions": [
//         {
//           "name": "mp4_720x720",
//           "height": 720,
//           "container": "mp4",
//           "url": "https://vid.tasty.co/output/256065/square_720/1664492817",
//           "content_type": "video/mp4",
//           "aspect": "square",
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/256065/square_720/1664492817_00001.png",
//           "file_size": 40859717,
//           "duration": 154785,
//           "bit_rate": 2112,
//           "width": 720
//         },
//         {
//           "url": "https://vid.tasty.co/output/256065/square_320/1664492817",
//           "bit_rate": 729,
//           "width": 320,
//           "minimum_bit_rate": null,
//           "content_type": "video/mp4",
//           "aspect": "square",
//           "name": "mp4_320x320",
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/256065/square_320/1664492817_00001.png",
//           "file_size": 14097914,
//           "duration": 154785,
//           "height": 320
//         },
//         {
//           "bit_rate": 2109,
//           "content_type": "video/mp4",
//           "aspect": "square",
//           "minimum_bit_rate": null,
//           "name": "mp4_720x720",
//           "height": 720,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/256065/landscape_720/1664492817_00001.png",
//           "duration": 154785,
//           "width": 720,
//           "maximum_bit_rate": null,
//           "file_size": 40797475,
//           "url": "https://vid.tasty.co/output/256065/landscape_720/1664492817"
//         },
//         {
//           "file_size": 23889370,
//           "url": "https://vid.tasty.co/output/256065/landscape_480/1664492817",
//           "minimum_bit_rate": null,
//           "name": "mp4_480x480",
//           "height": 480,
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/256065/landscape_480/1664492817_00001.png",
//           "duration": 154785,
//           "bit_rate": 1235,
//           "content_type": "video/mp4",
//           "aspect": "square",
//           "width": 480
//         },
//         {
//           "minimum_bit_rate": 273,
//           "height": 1080,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/256065/1445289064805-h2exzu/1664492817_00001.png",
//           "file_size": null,
//           "bit_rate": null,
//           "content_type": "application/vnd.apple.mpegurl",
//           "aspect": "square",
//           "maximum_bit_rate": 3590,
//           "container": "ts",
//           "url": "https://vid.tasty.co/output/256065/hls24_1664492817.m3u8",
//           "duration": 154780,
//           "width": 1080,
//           "name": "low"
//         }
//       ],
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/49e644299a674092bae3b4867cf3b8e8/ConAgra_VeggieSides3Ways_BFV95871_SQHero.mp4",
//       "num_servings": 4,
//       "yields": "Servings: 4",
//       "promotion": "full",
//       "total_time_tier": {
//         "display_tier": "Under 30 minutes",
//         "tier": "under_30_minutes"
//       },
//       "country": "US",
//       "facebook_posts": [],
//       "language": "eng",
//       "user_ratings": {
//         "count_positive": 19,
//         "score": 0.904762,
//         "count_negative": 2
//       },
//       "name": "Crispy Parmesan Green Beans",
//       "compilations": [
//         {
//           "created_at": 1664492851,
//           "description": null,
//           "slug": "veggie-sides-3-ways",
//           "video_id": 168439,
//           "video_url": "https://vid.tasty.co/output/256065/hls24_1664492817.m3u8",
//           "name": "Veggie Sides 3 Ways",
//           "id": 3327,
//           "country": "US",
//           "is_shoppable": false,
//           "keywords": null,
//           "facebook_posts": [],
//           "draft_status": "published",
//           "promotion": "full",
//           "approved_at": 1664820464,
//           "buzz_id": null,
//           "aspect_ratio": "1:1",
//           "show": [
//             {
//               "name": "Tasty",
//               "id": 17
//             }
//           ],
//           "language": "eng",
//           "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/402370.jpg",
//           "thumbnail_alt_text": "",
//           "canonical_id": "compilation:3327",
//           "beauty_url": "https://img.buzzfeed.com/video-api-prod/assets/cef067cf64354036b50af599e0fb3365/VeggieSides_Pinterest.jpg"
//         }
//       ],
//       "inspired_by_url": null,
//       "video_ad_content": "co_branded",
//       "video_id": 168439,
//       "canonical_id": "recipe:8499",
//       "id": 8499,
//       "tags": [
//         {
//           "name": "oven",
//           "id": 65846,
//           "display_name": "Oven",
//           "type": "appliance"
//         },
//         {
//           "name": "bbq",
//           "id": 64504,
//           "display_name": "BBQ",
//           "type": "occasion"
//         },
//         {
//           "display_name": "Appetizers",
//           "type": "meal",
//           "name": "appetizers",
//           "id": 64481
//         },
//         {
//           "name": "sides",
//           "id": 64490,
//           "display_name": "Sides",
//           "type": "meal"
//         },
//         {
//           "name": "under_30_minutes",
//           "id": 64472,
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_45_minutes",
//           "id": 8091747,
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "type": "difficulty",
//           "name": "under_1_hour",
//           "id": 8091748,
//           "display_name": "Under 1 Hour"
//         },
//         {
//           "name": "vegetarian",
//           "id": 64469,
//           "display_name": "Vegetarian",
//           "type": "dietary"
//         }
//       ],
//       "nutrition": {},
//       "tips_and_ratings_enabled": true,
//       "thumbnail_url": "https://s3.amazonaws.com/video-api-prod/assets/a70e4e797e7842dc8f630d4f933d4fb7/GreenBeans.jpg",
//       "beauty_url": "https://img.buzzfeed.com/video-api-prod/assets/cef067cf64354036b50af599e0fb3365/VeggieSides_Pinterest.jpg",
//       "seo_title": ""
//     },
//     {
//       "price": {
//         "consumption_portion": 150,
//         "total": 1900,
//         "updated_at": "2022-12-24T06:30:46+01:00",
//         "portion": 450,
//         "consumption_total": 550
//       },
//       "show_id": 17,
//       "thumbnail_url": "https://s3.amazonaws.com/video-api-prod/assets/aad0b459f555470586795f37a3fdd742/CornSkillet.jpg",
//       "video_url": "https://vid.tasty.co/output/256065/hls24_1664492817.m3u8",
//       "total_time_tier": {
//         "tier": "under_30_minutes",
//         "display_tier": "Under 30 minutes"
//       },
//       "instructions": [
//         {
//           "display_text": "Preheat the oven to 400°F (200°C).",
//           "start_time": 0,
//           "appliance": "oven",
//           "end_time": 0,
//           "temperature": 400,
//           "id": 73408,
//           "position": 1
//         },
//         {
//           "temperature": null,
//           "id": 73409,
//           "position": 2,
//           "display_text": "In a large cast iron skillet over medium heat, cook the bacon until it is fully cooked and crispy, 3–4 minutes. Remove from the pan and let cool, then crumble.",
//           "start_time": 51000,
//           "appliance": null,
//           "end_time": 60000
//         },
//         {
//           "position": 3,
//           "display_text": "Add the garlic to the pan and cook for about 1 minute, or until lightly browned and fragrant. Remove the pan from the heat.",
//           "start_time": 61000,
//           "appliance": null,
//           "end_time": 66500,
//           "temperature": null,
//           "id": 73410
//         },
//         {
//           "end_time": 81833,
//           "temperature": null,
//           "id": 73411,
//           "position": 4,
//           "display_text": "Add the Birds Eye Super Sweet Corn, crumbled bacon, green onions, salt, black pepper, mayonnaise, sour cream, and 1½ cups of pepper Jack cheese to the pan with the garlic and stir well to combine. Spread in an even layer and smooth the surface.",
//           "start_time": 67000,
//           "appliance": null
//         },
//         {
//           "start_time": 83000,
//           "appliance": null,
//           "end_time": 85166,
//           "temperature": null,
//           "id": 73412,
//           "position": 5,
//           "display_text": "Transfer the pan to the oven and bake for 10 minutes, or until the corn mixture is completely heated through and bubbling in the center. Remove the pan from the oven."
//         },
//         {
//           "temperature": null,
//           "id": 73413,
//           "position": 6,
//           "display_text": "Turn the broiler on high.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0
//         },
//         {
//           "position": 7,
//           "display_text": "Top the baked corn mixture with the remaining ½ cup of pepper Jack cheese and the crushed tortilla chips.",
//           "start_time": 91000,
//           "appliance": null,
//           "end_time": 100000,
//           "temperature": null,
//           "id": 73414
//         },
//         {
//           "position": 8,
//           "display_text": "Place the pan under the broiler for 1–3 minutes, or until the cheese is bubbling and slightly browned.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 73415
//         },
//         {
//           "appliance": null,
//           "end_time": 102833,
//           "temperature": null,
//           "id": 73416,
//           "position": 9,
//           "display_text": "Garnish the corn skillet with sliced green onions and serve immediately.",
//           "start_time": 101000
//         },
//         {
//           "temperature": null,
//           "id": 73417,
//           "position": 10,
//           "display_text": "Enjoy!",
//           "start_time": 104000,
//           "appliance": null,
//           "end_time": 107833
//         }
//       ],
//       "user_ratings": {
//         "count_positive": 6,
//         "score": 0.857143,
//         "count_negative": 1
//       },
//       "description": "",
//       "inspired_by_url": null,
//       "credits": [
//         {
//           "id": 115,
//           "type": "brand",
//           "slug": "birds-eye",
//           "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/980c12d0123547f7af57dabec79f2e09.jpeg",
//           "name": "Birds Eye"
//         }
//       ],
//       "yields": "Servings: 4",
//       "language": "eng",
//       "tips_and_ratings_enabled": true,
//       "aspect_ratio": "1:1",
//       "renditions": [
//         {
//           "maximum_bit_rate": null,
//           "file_size": 40859717,
//           "url": "https://vid.tasty.co/output/256065/square_720/1664492817",
//           "aspect": "square",
//           "bit_rate": 2112,
//           "content_type": "video/mp4",
//           "width": 720,
//           "minimum_bit_rate": null,
//           "name": "mp4_720x720",
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/256065/square_720/1664492817_00001.png",
//           "duration": 154785,
//           "height": 720
//         },
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/256065/square_320/1664492817_00001.png",
//           "file_size": 14097914,
//           "content_type": "video/mp4",
//           "width": 320,
//           "minimum_bit_rate": null,
//           "name": "mp4_320x320",
//           "container": "mp4",
//           "duration": 154785,
//           "bit_rate": 729,
//           "aspect": "square",
//           "maximum_bit_rate": null,
//           "height": 320,
//           "url": "https://vid.tasty.co/output/256065/square_320/1664492817"
//         },
//         {
//           "aspect": "square",
//           "height": 720,
//           "url": "https://vid.tasty.co/output/256065/landscape_720/1664492817",
//           "content_type": "video/mp4",
//           "file_size": 40797475,
//           "duration": 154785,
//           "bit_rate": 2109,
//           "width": 720,
//           "minimum_bit_rate": null,
//           "name": "mp4_720x720",
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/256065/landscape_720/1664492817_00001.png",
//           "maximum_bit_rate": null
//         },
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/256065/landscape_480/1664492817_00001.png",
//           "file_size": 23889370,
//           "content_type": "video/mp4",
//           "aspect": "square",
//           "width": 480,
//           "name": "mp4_480x480",
//           "height": 480,
//           "container": "mp4",
//           "url": "https://vid.tasty.co/output/256065/landscape_480/1664492817",
//           "duration": 154785,
//           "bit_rate": 1235,
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null
//         },
//         {
//           "width": 1080,
//           "minimum_bit_rate": 273,
//           "maximum_bit_rate": 3590,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/256065/1445289064805-h2exzu/1664492817_00001.png",
//           "url": "https://vid.tasty.co/output/256065/hls24_1664492817.m3u8",
//           "content_type": "application/vnd.apple.mpegurl",
//           "aspect": "square",
//           "name": "low",
//           "height": 1080,
//           "container": "ts",
//           "file_size": null,
//           "duration": 154780,
//           "bit_rate": null
//         }
//       ],
//       "is_shoppable": false,
//       "seo_title": "",
//       "cook_time_minutes": null,
//       "slug": "cheesy-corn-skillet",
//       "brand_id": 115,
//       "tags": [
//         {
//           "type": "meal",
//           "name": "appetizers",
//           "id": 64481,
//           "display_name": "Appetizers"
//         },
//         {
//           "id": 65846,
//           "display_name": "Oven",
//           "type": "appliance",
//           "name": "oven"
//         },
//         {
//           "name": "bbq",
//           "id": 64504,
//           "display_name": "BBQ",
//           "type": "occasion"
//         },
//         {
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty",
//           "name": "under_30_minutes",
//           "id": 64472
//         },
//         {
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty",
//           "name": "under_45_minutes",
//           "id": 8091747
//         },
//         {
//           "name": "under_1_hour",
//           "id": 8091748,
//           "display_name": "Under 1 Hour",
//           "type": "difficulty"
//         },
//         {
//           "name": "sides",
//           "id": 64490,
//           "display_name": "Sides",
//           "type": "meal"
//         },
//         {
//           "id": 64503,
//           "display_name": "Casual Party",
//           "type": "occasion",
//           "name": "casual_party"
//         }
//       ],
//       "brand": {
//         "slug": "birds-eye",
//         "image_url": "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/980c12d0123547f7af57dabec79f2e09.jpeg",
//         "name": "Birds Eye",
//         "id": 115
//       },
//       "prep_time_minutes": null,
//       "nutrition": {},
//       "is_one_top": false,
//       "servings_noun_plural": "servings",
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/49e644299a674092bae3b4867cf3b8e8/ConAgra_VeggieSides3Ways_BFV95871_SQHero.mp4",
//       "promotion": "full",
//       "country": "US",
//       "keywords": "",
//       "num_servings": 4,
//       "thumbnail_alt_text": "",
//       "total_time_minutes": 30,
//       "approved_at": 1664820391,
//       "beauty_url": "https://img.buzzfeed.com/video-api-prod/assets/cef067cf64354036b50af599e0fb3365/VeggieSides_Pinterest.jpg",
//       "canonical_id": "recipe:8498",
//       "sections": [
//         {
//           "components": [
//             {
//               "raw_text": "2 slices of bacon",
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "bacon",
//                 "created_at": 1494212643,
//                 "display_plural": "bacons",
//                 "id": 214,
//                 "display_singular": "bacon",
//                 "updated_at": 1509035279
//               },
//               "id": 97225,
//               "position": 1,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "slice",
//                     "display_plural": "slices",
//                     "display_singular": "slice",
//                     "abbreviation": "slice"
//                   },
//                   "quantity": "2",
//                   "id": 709141
//                 }
//               ]
//             },
//             {
//               "id": 97226,
//               "position": 2,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "clove",
//                     "display_plural": "cloves",
//                     "display_singular": "clove",
//                     "abbreviation": "clove"
//                   },
//                   "quantity": "1",
//                   "id": 709142
//                 }
//               ],
//               "raw_text": "1 garlic clove, minced",
//               "extra_comment": "minced",
//               "ingredient": {
//                 "updated_at": 1509035285,
//                 "name": "garlic",
//                 "created_at": 1493744766,
//                 "display_plural": "garlics",
//                 "id": 95,
//                 "display_singular": "garlic"
//               }
//             },
//             {
//               "raw_text": "2 cups Birds Eye Super Sweet Corn, cooked according to package instructions and drained",
//               "extra_comment": "cooked according to package instructions and drained\n",
//               "ingredient": {
//                 "created_at": 1664494810,
//                 "display_plural": "Birds Eye Super Sweet Corns",
//                 "id": 10351,
//                 "display_singular": "Birds Eye Super Sweet Corn",
//                 "updated_at": 1664494810,
//                 "name": "Birds Eye Super Sweet Corn"
//               },
//               "id": 97227,
//               "position": 3,
//               "measurements": [
//                 {
//                   "id": 709149,
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "330"
//                 },
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   },
//                   "quantity": "2",
//                   "id": 709147
//                 }
//               ]
//             },
//             {
//               "position": 4,
//               "measurements": [
//                 {
//                   "id": 709154,
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "35"
//                 },
//                 {
//                   "unit": {
//                     "display_singular": "cup",
//                     "abbreviation": "c",
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups"
//                   },
//                   "quantity": "¼",
//                   "id": 709153
//                 }
//               ],
//               "raw_text": "¼ cup finely chopped green onions, plus more for garnish",
//               "extra_comment": "plus more for garnish",
//               "ingredient": {
//                 "id": 255,
//                 "display_singular": "green onion",
//                 "updated_at": 1509035275,
//                 "name": "green onion",
//                 "created_at": 1494382484,
//                 "display_plural": "green onions"
//               },
//               "id": 97228
//             },
//             {
//               "raw_text": "½ teaspoon kosher salt",
//               "extra_comment": "",
//               "ingredient": {
//                 "created_at": 1493307153,
//                 "display_plural": "kosher salts",
//                 "id": 11,
//                 "display_singular": "kosher salt",
//                 "updated_at": 1509035289,
//                 "name": "kosher salt"
//               },
//               "id": 97229,
//               "position": 5,
//               "measurements": [
//                 {
//                   "quantity": "½",
//                   "id": 709143,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon",
//                     "abbreviation": "tsp"
//                   }
//                 }
//               ]
//             },
//             {
//               "position": 6,
//               "measurements": [
//                 {
//                   "quantity": "¼",
//                   "id": 709140,
//                   "unit": {
//                     "abbreviation": "tsp",
//                     "system": "imperial",
//                     "name": "teaspoon",
//                     "display_plural": "teaspoons",
//                     "display_singular": "teaspoon"
//                   }
//                 }
//               ],
//               "raw_text": "¼ teaspoon freshly ground black pepper",
//               "extra_comment": "",
//               "ingredient": {
//                 "created_at": 1493925438,
//                 "display_plural": "freshly ground black peppers",
//                 "id": 166,
//                 "display_singular": "freshly ground black pepper",
//                 "updated_at": 1509035282,
//                 "name": "freshly ground black pepper"
//               },
//               "id": 97230
//             },
//             {
//               "raw_text": "2 tablespoons mayonnaise",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 583,
//                 "display_singular": "mayonnaise",
//                 "updated_at": 1509035249,
//                 "name": "mayonnaise",
//                 "created_at": 1495392174,
//                 "display_plural": "mayonnaises"
//               },
//               "id": 97231,
//               "position": 7,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp"
//                   },
//                   "quantity": "2",
//                   "id": 709145
//                 }
//               ]
//             },
//             {
//               "raw_text": "½ cup sour cream",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1509035256,
//                 "name": "sour cream",
//                 "created_at": 1495154479,
//                 "display_plural": "sour creams",
//                 "id": 496,
//                 "display_singular": "sour cream"
//               },
//               "id": 97232,
//               "position": 8,
//               "measurements": [
//                 {
//                   "unit": {
//                     "name": "milliliter",
//                     "display_plural": "mL",
//                     "display_singular": "mL",
//                     "abbreviation": "mL",
//                     "system": "metric"
//                   },
//                   "quantity": "120",
//                   "id": 709152
//                 },
//                 {
//                   "unit": {
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c",
//                     "system": "imperial"
//                   },
//                   "quantity": "½",
//                   "id": 709151
//                 }
//               ]
//             },
//             {
//               "raw_text": "2 cups shredded pepper Jack cheese, divided",
//               "extra_comment": "divided",
//               "ingredient": {
//                 "updated_at": 1533577481,
//                 "name": "shredded pepper jack  cheese",
//                 "created_at": 1533577481,
//                 "display_plural": "shredded pepper jack  cheeses",
//                 "id": 4545,
//                 "display_singular": "shredded pepper jack  cheese"
//               },
//               "id": 97233,
//               "position": 9,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "200",
//                   "id": 709146
//                 },
//                 {
//                   "unit": {
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c",
//                     "system": "imperial"
//                   },
//                   "quantity": "2",
//                   "id": 709144
//                 }
//               ]
//             },
//             {
//               "raw_text": "¼ cup crushed white corn tortilla chips",
//               "extra_comment": "crushed",
//               "ingredient": {
//                 "updated_at": 1664821551,
//                 "name": "white corn tortilla chips",
//                 "created_at": 1664821551,
//                 "display_plural": "white corn tortilla chips",
//                 "id": 10358,
//                 "display_singular": "white corn tortilla chip"
//               },
//               "id": 97234,
//               "position": 10,
//               "measurements": [
//                 {
//                   "unit": {
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric"
//                   },
//                   "quantity": "10",
//                   "id": 709150
//                 },
//                 {
//                   "unit": {
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c",
//                     "system": "imperial"
//                   },
//                   "quantity": "¼",
//                   "id": 709148
//                 }
//               ]
//             }
//           ],
//           "name": null,
//           "position": 1
//         }
//       ],
//       "name": "Cheesy Corn Skillet",
//       "compilations": [
//         {
//           "facebook_posts": [],
//           "description": null,
//           "draft_status": "published",
//           "approved_at": 1664820464,
//           "id": 3327,
//           "beauty_url": "https://img.buzzfeed.com/video-api-prod/assets/cef067cf64354036b50af599e0fb3365/VeggieSides_Pinterest.jpg",
//           "promotion": "full",
//           "video_id": 168439,
//           "created_at": 1664492851,
//           "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/402370.jpg",
//           "thumbnail_alt_text": "",
//           "slug": "veggie-sides-3-ways",
//           "aspect_ratio": "1:1",
//           "country": "US",
//           "keywords": null,
//           "show": [
//             {
//               "name": "Tasty",
//               "id": 17
//             }
//           ],
//           "buzz_id": null,
//           "is_shoppable": false,
//           "language": "eng",
//           "video_url": "https://vid.tasty.co/output/256065/hls24_1664492817.m3u8",
//           "name": "Veggie Sides 3 Ways",
//           "canonical_id": "compilation:3327"
//         }
//       ],
//       "created_at": 1664492851,
//       "draft_status": "published",
//       "video_ad_content": "co_branded",
//       "facebook_posts": [],
//       "id": 8498,
//       "buzz_id": null,
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "updated_at": 1664820392,
//       "topics": [
//         {
//           "name": "BBQ Season",
//           "slug": "bbq"
//         }
//       ],
//       "video_id": 168439,
//       "nutrition_visibility": "auto",
//       "servings_noun_singular": "serving"
//     },
//     {
//       "sections": [
//         {
//           "position": 1,
//           "components": [
//             {
//               "position": 1,
//               "measurements": [
//                 {
//                   "unit": {
//                     "abbreviation": "",
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": ""
//                   },
//                   "quantity": "0",
//                   "id": 709122
//                 }
//               ],
//               "raw_text": "n/a",
//               "extra_comment": "",
//               "ingredient": {
//                 "updated_at": 1663791149,
//                 "name": "A dash of your favorite creators",
//                 "created_at": 1663791149,
//                 "display_plural": "A dashes of your favorite creators",
//                 "id": 10248,
//                 "display_singular": "A dash of your favorite creators"
//               },
//               "id": 97184
//             },
//             {
//               "extra_comment": "",
//               "ingredient": {
//                 "name": "ounces viral Tasty classics",
//                 "created_at": 1664488848,
//                 "display_plural": "ounces viral Tasty classics",
//                 "id": 10346,
//                 "display_singular": "ounces viral Tasty classic",
//                 "updated_at": 1664488848
//               },
//               "id": 97185,
//               "position": 2,
//               "measurements": [
//                 {
//                   "unit": {
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": "",
//                     "system": "none"
//                   },
//                   "quantity": "8",
//                   "id": 709124
//                 }
//               ],
//               "raw_text": "n/a"
//             },
//             {
//               "raw_text": "1 package of live cooking demos",
//               "extra_comment": "",
//               "ingredient": {
//                 "created_at": 1663791304,
//                 "display_plural": "live cooking demos",
//                 "id": 10252,
//                 "display_singular": "live cooking demo",
//                 "updated_at": 1663791304,
//                 "name": "live cooking demos"
//               },
//               "id": 97181,
//               "position": 3,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "package",
//                     "display_plural": "packages",
//                     "display_singular": "package",
//                     "abbreviation": "package"
//                   },
//                   "quantity": "1",
//                   "id": 709128
//                 }
//               ]
//             },
//             {
//               "id": 97182,
//               "position": 4,
//               "measurements": [
//                 {
//                   "unit": {
//                     "display_singular": "g",
//                     "abbreviation": "g",
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g"
//                   },
//                   "quantity": "285",
//                   "id": 709127
//                 },
//                 {
//                   "unit": {
//                     "abbreviation": "oz",
//                     "system": "imperial",
//                     "name": "ounce",
//                     "display_plural": "oz",
//                     "display_singular": "oz"
//                   },
//                   "quantity": "10",
//                   "id": 709126
//                 },
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "can",
//                     "display_plural": "cans",
//                     "display_singular": "can",
//                     "abbreviation": "can"
//                   },
//                   "quantity": "3",
//                   "id": 709125
//                 }
//               ],
//               "raw_text": "3 10-ounce cans of local eats",
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 10341,
//                 "display_singular": "local eat",
//                 "updated_at": 1664488053,
//                 "name": "local eats",
//                 "created_at": 1664488053,
//                 "display_plural": "local eats"
//               }
//             },
//             {
//               "raw_text": "Spicy challenges, to taste",
//               "extra_comment": "to taste",
//               "ingredient": {
//                 "id": 10254,
//                 "display_singular": "spicy challenge",
//                 "updated_at": 1663791451,
//                 "name": "spicy challenges",
//                 "created_at": 1663791451,
//                 "display_plural": "spicy challenges"
//               },
//               "id": 97183,
//               "position": 5,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "none",
//                     "name": "",
//                     "display_plural": "",
//                     "display_singular": "",
//                     "abbreviation": ""
//                   },
//                   "quantity": "0",
//                   "id": 709123
//                 }
//               ]
//             }
//           ],
//           "name": null
//         }
//       ],
//       "tips_and_ratings_enabled": true,
//       "description": "Join Tasty & First We Feast for Eat Your Feed Fest, our first-ever food festival, November 19 and 20, 2022 in Long Beach, California! Want to attend the fest as our guest? Leave a comment on this recipe letting us know what you’d like to try at Eat Your Feed Fest and fill out our <a href=\"https://docs.google.com/forms/d/e/1FAIpQLSeJkPFqODH2GRe_gb_2Bs0MuuMFLKFRjiWmmctlX6UyeJXNEg/viewform?usp=sf_link\">official entry form</a>. The winner will receive two General Admission 2-Day Tickets to ComplexCon. Winners will be selected at random and notified by November 10, 2022.",
//       "beauty_url": null,
//       "price": {
//         "total": 0,
//         "updated_at": "2022-12-24T06:30:43+01:00",
//         "portion": 0,
//         "consumption_total": 0,
//         "consumption_portion": 0
//       },
//       "brand": null,
//       "prep_time_minutes": 10,
//       "show": {
//         "id": 17,
//         "name": "Tasty"
//       },
//       "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/402248.jpg",
//       "updated_at": 1664807090,
//       "seo_title": "Eat Your Feed Fest Pizza Recipe & Ticket Giveaway ",
//       "promotion": "full",
//       "language": "eng",
//       "slug": "eat-your-feed-fest-pizza",
//       "nutrition": {},
//       "video_id": 167170,
//       "thumbnail_alt_text": "",
//       "approved_at": 1664488873,
//       "yields": "Servings: 8",
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/6798bdd51a96437ea04bf91de3a54fd5/EYFF_RECIPE_PROMO_V05.mp4",
//       "canonical_id": "recipe:8494",
//       "nutrition_visibility": "auto",
//       "num_servings": 8,
//       "aspect_ratio": "9:16",
//       "is_one_top": false,
//       "is_shoppable": false,
//       "buzz_id": null,
//       "total_time_minutes": 20,
//       "credits": [
//         {
//           "name": "Murad Yasin",
//           "type": "internal"
//         }
//       ],
//       "video_url": "https://vid.tasty.co/output/255984/hls24_1664467917.m3u8",
//       "video_ad_content": "none",
//       "cook_time_minutes": 10,
//       "tags": [
//         {
//           "name": "5_ingredients_or_less",
//           "id": 64470,
//           "display_name": "5 Ingredients or Less",
//           "type": "difficulty"
//         },
//         {
//           "id": 64471,
//           "display_name": "Easy",
//           "type": "difficulty",
//           "name": "easy"
//         },
//         {
//           "name": "under_1_hour",
//           "id": 8091748,
//           "display_name": "Under 1 Hour",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_15_minutes",
//           "id": 8091744,
//           "display_name": "Under 15 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_30_minutes",
//           "id": 64472,
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_45_minutes",
//           "id": 8091747,
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "type": "meal",
//           "name": "dinner",
//           "id": 64486,
//           "display_name": "Dinner"
//         },
//         {
//           "name": "lunch",
//           "id": 64489,
//           "display_name": "Lunch",
//           "type": "meal"
//         },
//         {
//           "name": "dairy_free",
//           "id": 64463,
//           "display_name": "Dairy-Free",
//           "type": "dietary"
//         },
//         {
//           "name": "gluten_free",
//           "id": 64465,
//           "display_name": "Gluten-Free",
//           "type": "dietary"
//         },
//         {
//           "name": "healthy",
//           "id": 64466,
//           "display_name": "Healthy",
//           "type": "dietary"
//         },
//         {
//           "type": "dietary",
//           "name": "keto",
//           "id": 8091756,
//           "display_name": "Keto"
//         },
//         {
//           "name": "pescatarian",
//           "id": 3801552,
//           "display_name": "Pescatarian",
//           "type": "dietary"
//         },
//         {
//           "name": "vegan",
//           "id": 64468,
//           "display_name": "Vegan",
//           "type": "dietary"
//         },
//         {
//           "name": "vegetarian",
//           "id": 64469,
//           "display_name": "Vegetarian",
//           "type": "dietary"
//         }
//       ],
//       "draft_status": "published",
//       "inspired_by_url": null,
//       "facebook_posts": [],
//       "servings_noun_singular": "serving",
//       "show_id": 17,
//       "name": "Eat Your Feed Fest Pizza",
//       "country": "US",
//       "instructions": [
//         {
//           "temperature": null,
//           "id": 73374,
//           "position": 1,
//           "display_text": "Tap the “I made this!” button on this recipe.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0
//         },
//         {
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 73375,
//           "position": 2,
//           "display_text": "Leave a comment letting us know which Tasty recipe you’d like to enjoy at Eat Your Feed Fest or why you love Tasty with the hashtag #EatYourFeedFest."
//         },
//         {
//           "temperature": null,
//           "id": 73376,
//           "position": 3,
//           "display_text": "Let us know how to contact you using the official entry form (link is located in the tip section).",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0
//         },
//         {
//           "temperature": null,
//           "id": 73377,
//           "position": 4,
//           "display_text": "Mark your calendars for November 19 and 20.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0
//         },
//         {
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 73378,
//           "position": 5,
//           "display_text": "Keep an eye out for our ticket winner announcement by November 10, 2022."
//         },
//         {
//           "end_time": 0,
//           "temperature": null,
//           "id": 73379,
//           "position": 6,
//           "display_text": "Enjoy live cooking demos hosted by your favorite creators, try some of Tasty's most popular recipes, and eat your way through some of LA's most iconic restaurants and food trucks!",
//           "start_time": 0,
//           "appliance": null
//         },
//         {
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0,
//           "temperature": null,
//           "id": 73380,
//           "position": 7,
//           "display_text": "Have fun!"
//         }
//       ],
//       "keywords": "complexcon, cooking demos, eat your feed fest, food, local eats, long beach, pizza, recipe, tasty, ticket giveaway, viral",
//       "total_time_tier": {
//         "display_tier": "Under 30 minutes",
//         "tier": "under_30_minutes"
//       },
//       "compilations": [],
//       "servings_noun_plural": "servings",
//       "topics": [
//         {
//           "name": "5 Ingredients or Less",
//           "slug": "5-ingredients-or-less"
//         },
//         {
//           "slug": "best-vegetarian",
//           "name": "Best Vegetarian"
//         },
//         {
//           "name": "Easy Dinner",
//           "slug": "easy-dinner"
//         },
//         {
//           "name": "Healthy Eating",
//           "slug": "healthy"
//         },
//         {
//           "slug": "keto",
//           "name": "Keto"
//         },
//         {
//           "name": "Vegan",
//           "slug": "vegan"
//         },
//         {
//           "name": "Lunch",
//           "slug": "lunch"
//         },
//         {
//           "name": "Dinner",
//           "slug": "dinner"
//         }
//       ],
//       "created_at": 1664482587,
//       "renditions": [
//         {
//           "name": "mp4_404x720",
//           "maximum_bit_rate": null,
//           "file_size": 6079406,
//           "content_type": "video/mp4",
//           "width": 404,
//           "duration": 24381,
//           "bit_rate": 1995,
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "height": 720,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/255984/square_720/1664467917_00001.png",
//           "url": "https://vid.tasty.co/output/255984/square_720/1664467917"
//         },
//         {
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "name": "mp4_180x320",
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/255984/square_320/1664467917_00001.png",
//           "url": "https://vid.tasty.co/output/255984/square_320/1664467917",
//           "duration": 24381,
//           "bit_rate": 714,
//           "maximum_bit_rate": null,
//           "file_size": 2174791,
//           "width": 180,
//           "minimum_bit_rate": null,
//           "height": 320
//         },
//         {
//           "container": "mp4",
//           "file_size": 6072532,
//           "url": "https://vid.tasty.co/output/255984/landscape_720/1664467917",
//           "duration": 24381,
//           "width": 404,
//           "minimum_bit_rate": null,
//           "height": 720,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/255984/landscape_720/1664467917_00001.png",
//           "bit_rate": 1993,
//           "content_type": "video/mp4",
//           "aspect": "portrait",
//           "name": "mp4_404x720",
//           "maximum_bit_rate": null
//         },
//         {
//           "container": "mp4",
//           "file_size": 3535557,
//           "content_type": "video/mp4",
//           "minimum_bit_rate": null,
//           "height": 480,
//           "maximum_bit_rate": null,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/255984/landscape_480/1664467917_00001.png",
//           "url": "https://vid.tasty.co/output/255984/landscape_480/1664467917",
//           "duration": 24381,
//           "bit_rate": 1161,
//           "aspect": "portrait",
//           "width": 270,
//           "name": "mp4_270x480"
//         },
//         {
//           "width": 608,
//           "name": "low",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/255984/1445289064805-h2exzu/1664467917_00001.png",
//           "file_size": null,
//           "duration": 24400,
//           "content_type": "application/vnd.apple.mpegurl",
//           "minimum_bit_rate": 278,
//           "maximum_bit_rate": 3100,
//           "height": 1080,
//           "container": "ts",
//           "url": "https://vid.tasty.co/output/255984/hls24_1664467917.m3u8",
//           "bit_rate": null,
//           "aspect": "portrait"
//         }
//       ],
//       "user_ratings": {
//         "count_positive": 48,
//         "score": 0.90566,
//         "count_negative": 5
//       },
//       "id": 8494,
//       "brand_id": null
//     },
//     {
//       "renditions": [
//         {
//           "file_size": 3837466,
//           "aspect": "portrait",
//           "minimum_bit_rate": null,
//           "name": "mp4_404x720",
//           "height": 720,
//           "content_type": "video/mp4",
//           "width": 404,
//           "maximum_bit_rate": null,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/255908/square_720/1664399727_00001.png",
//           "url": "https://vid.tasty.co/output/255908/square_720/1664399727",
//           "duration": 23441,
//           "bit_rate": 1310
//         },
//         {
//           "bit_rate": 495,
//           "content_type": "video/mp4",
//           "maximum_bit_rate": null,
//           "height": 320,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/255908/square_320/1664399727_00001.png",
//           "file_size": 1449739,
//           "url": "https://vid.tasty.co/output/255908/square_320/1664399727",
//           "width": 180,
//           "minimum_bit_rate": null,
//           "name": "mp4_180x320",
//           "container": "mp4",
//           "duration": 23441,
//           "aspect": "portrait"
//         },
//         {
//           "aspect": "portrait",
//           "width": 404,
//           "name": "mp4_404x720",
//           "file_size": 3837851,
//           "duration": 23441,
//           "bit_rate": 1310,
//           "content_type": "video/mp4",
//           "minimum_bit_rate": null,
//           "maximum_bit_rate": null,
//           "height": 720,
//           "container": "mp4",
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/255908/landscape_720/1664399727_00001.png",
//           "url": "https://vid.tasty.co/output/255908/landscape_720/1664399727"
//         },
//         {
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/255908/landscape_480/1664399727_00001.png",
//           "duration": 23441,
//           "content_type": "video/mp4",
//           "width": 270,
//           "minimum_bit_rate": null,
//           "height": 480,
//           "container": "mp4",
//           "url": "https://vid.tasty.co/output/255908/landscape_480/1664399727",
//           "bit_rate": 769,
//           "aspect": "portrait",
//           "name": "mp4_270x480",
//           "maximum_bit_rate": null,
//           "file_size": 2250410
//         },
//         {
//           "name": "low",
//           "container": "ts",
//           "bit_rate": null,
//           "content_type": "application/vnd.apple.mpegurl",
//           "duration": 23482,
//           "aspect": "portrait",
//           "width": 608,
//           "minimum_bit_rate": 272,
//           "maximum_bit_rate": 2022,
//           "poster_url": "https://img.buzzfeed.com/video-transcoder-prod/output/255908/1445289064805-h2exzu/1664399727_00001.png",
//           "file_size": null,
//           "url": "https://vid.tasty.co/output/255908/hls24_1664399727.m3u8",
//           "height": 1080
//         }
//       ],
//       "topics": [
//         {
//           "name": "5 Ingredients or Less",
//           "slug": "5-ingredients-or-less"
//         },
//         {
//           "slug": "best-vegetarian",
//           "name": "Best Vegetarian"
//         },
//         {
//           "name": "Fall Recipes",
//           "slug": "fall"
//         },
//         {
//           "name": "Halloween",
//           "slug": "halloween"
//         },
//         {
//           "name": "No Bake Desserts",
//           "slug": "no-bake-desserts"
//         },
//         {
//           "name": "Thanksgiving",
//           "slug": "thanksgiving"
//         },
//         {
//           "name": "Winter Recipes",
//           "slug": "winter"
//         },
//         {
//           "slug": "snacks",
//           "name": "Snacks"
//         }
//       ],
//       "country": "US",
//       "nutrition": {},
//       "description": "This caramel apple cream cheese board is perfect for the fall season! If you don’t want to go the trouble of making cheesecake or caramel apples from scratch, this is the recipe for you! It comes together quickly and is super delicious, without being overly sweet.",
//       "updated_at": 1664402249,
//       "servings_noun_plural": "servings",
//       "price": {
//         "total": 850,
//         "updated_at": "2022-12-24T06:30:41+01:00",
//         "portion": 100,
//         "consumption_total": 550,
//         "consumption_portion": 50
//       },
//       "draft_status": "published",
//       "inspired_by_url": null,
//       "beauty_url": null,
//       "is_shoppable": true,
//       "original_video_url": "https://s3.amazonaws.com/video-api-prod/assets/76d57d2e9e0040f89189b0eb6c19f9b2/CaramelAppleCheeseBoard.mp4",
//       "promotion": "full",
//       "user_ratings": {
//         "count_positive": 33,
//         "score": 0.970588,
//         "count_negative": 1
//       },
//       "brand_id": null,
//       "aspect_ratio": "9:16",
//       "show": {
//         "name": "Tasty",
//         "id": 17
//       },
//       "video_url": "https://vid.tasty.co/output/255908/hls24_1664399727.m3u8",
//       "buzz_id": null,
//       "approved_at": 1664402249,
//       "nutrition_visibility": "auto",
//       "show_id": 17,
//       "prep_time_minutes": 3,
//       "tags": [
//         {
//           "type": "difficulty",
//           "name": "5_ingredients_or_less",
//           "id": 64470,
//           "display_name": "5 Ingredients or Less"
//         },
//         {
//           "name": "snacks",
//           "id": 64491,
//           "display_name": "Snacks",
//           "type": "meal"
//         },
//         {
//           "id": 64472,
//           "display_name": "Under 30 Minutes",
//           "type": "difficulty",
//           "name": "under_30_minutes"
//         },
//         {
//           "type": "cooking_style",
//           "name": "no_bake_desserts",
//           "id": 65854,
//           "display_name": "No Bake Desserts"
//         },
//         {
//           "id": 64481,
//           "display_name": "Appetizers",
//           "type": "meal",
//           "name": "appetizers"
//         },
//         {
//           "id": 64479,
//           "display_name": "Thanksgiving",
//           "type": "holiday",
//           "name": "thanksgiving"
//         },
//         {
//           "name": "casual_party",
//           "id": 64503,
//           "display_name": "Casual Party",
//           "type": "occasion"
//         },
//         {
//           "name": "halloween",
//           "id": 64476,
//           "display_name": "Halloween",
//           "type": "holiday"
//         },
//         {
//           "name": "indulgent_sweets",
//           "id": 65850,
//           "display_name": "Indulgent Sweets",
//           "type": "occasion"
//         },
//         {
//           "name": "fall",
//           "id": 64508,
//           "display_name": "Fall",
//           "type": "seasonal"
//         },
//         {
//           "id": 64511,
//           "display_name": "Winter",
//           "type": "seasonal",
//           "name": "winter"
//         },
//         {
//           "id": 8091744,
//           "display_name": "Under 15 Minutes",
//           "type": "difficulty",
//           "name": "under_15_minutes"
//         },
//         {
//           "name": "under_45_minutes",
//           "id": 8091747,
//           "display_name": "Under 45 Minutes",
//           "type": "difficulty"
//         },
//         {
//           "name": "under_1_hour",
//           "id": 8091748,
//           "display_name": "Under 1 Hour",
//           "type": "difficulty"
//         },
//         {
//           "name": "vegetarian",
//           "id": 64469,
//           "display_name": "Vegetarian",
//           "type": "dietary"
//         }
//       ],
//       "compilations": [],
//       "video_id": 169396,
//       "sections": [
//         {
//           "components": [
//             {
//               "position": 1,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "ounce",
//                     "display_plural": "oz",
//                     "display_singular": "oz",
//                     "abbreviation": "oz"
//                   },
//                   "quantity": "8",
//                   "id": 708049
//                 },
//                 {
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "225",
//                   "id": 708048
//                 }
//               ],
//               "raw_text": "8 ounces cream cheese, room temperature",
//               "extra_comment": "room temperature",
//               "ingredient": {
//                 "updated_at": 1509035276,
//                 "name": "cream cheese",
//                 "created_at": 1494297000,
//                 "display_plural": "cream cheeses",
//                 "id": 242,
//                 "display_singular": "cream cheese"
//               },
//               "id": 97069
//             },
//             {
//               "id": 97070,
//               "position": 2,
//               "measurements": [
//                 {
//                   "quantity": "¼",
//                   "id": 708045,
//                   "unit": {
//                     "system": "imperial",
//                     "name": "cup",
//                     "display_plural": "cups",
//                     "display_singular": "cup",
//                     "abbreviation": "c"
//                   }
//                 },
//                 {
//                   "id": 708044,
//                   "unit": {
//                     "system": "metric",
//                     "name": "gram",
//                     "display_plural": "g",
//                     "display_singular": "g",
//                     "abbreviation": "g"
//                   },
//                   "quantity": "60"
//                 }
//               ],
//               "raw_text": "¼ cup caramel sauce, plus more for garnish",
//               "extra_comment": "plus more for garnish",
//               "ingredient": {
//                 "display_singular": "caramel sauce",
//                 "updated_at": 1509035247,
//                 "name": "caramel sauce",
//                 "created_at": 1495476518,
//                 "display_plural": "caramel sauces",
//                 "id": 606
//               }
//             },
//             {
//               "id": 97071,
//               "position": 3,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp"
//                   },
//                   "quantity": "2",
//                   "id": 708046
//                 }
//               ],
//               "raw_text": "2 tablespoons chopped peanuts",
//               "extra_comment": "chopped",
//               "ingredient": {
//                 "display_plural": "peanuts",
//                 "id": 269,
//                 "display_singular": "peanut",
//                 "updated_at": 1521648549,
//                 "name": "peanuts",
//                 "created_at": 1494623909
//               }
//             },
//             {
//               "id": 97072,
//               "position": 4,
//               "measurements": [
//                 {
//                   "unit": {
//                     "system": "imperial",
//                     "name": "tablespoon",
//                     "display_plural": "tablespoons",
//                     "display_singular": "tablespoon",
//                     "abbreviation": "tbsp"
//                   },
//                   "quantity": "½",
//                   "id": 708047
//                 }
//               ],
//               "raw_text": "½ tablespoon chopped chocolate-covered toffee candy, such as Heath",
//               "extra_comment": "heath, chopped",
//               "ingredient": {
//                 "updated_at": 1664401690,
//                 "name": "chocolate-covered toffee candy",
//                 "created_at": 1664401690,
//                 "display_plural": "chocolate-covered toffee candies",
//                 "id": 10309,
//                 "display_singular": "chocolate-covered toffee candy"
//               }
//             },
//             {
//               "extra_comment": "",
//               "ingredient": {
//                 "id": 1697,
//                 "display_singular": "green apple",
//                 "updated_at": 1509035172,
//                 "name": "green apple",
//                 "created_at": 1496963070,
//                 "display_plural": "green apples"
//               },
//               "id": 97073,
//               "position": 5,
//               "measurements": [
//                 {
//                   "id": 708050,
//                   "unit": {
//                     "system": "none",
//                     "name": "slice",
//                     "display_plural": "slices",
//                     "display_singular": "slice",
//                     "abbreviation": "slice"
//                   },
//                   "quantity": "40"
//                 }
//               ],
//               "raw_text": "40 green apple slices"
//             }
//           ],
//           "name": null,
//           "position": 1
//         }
//       ],
//       "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/402126.jpg",
//       "is_one_top": false,
//       "video_ad_content": "none",
//       "cook_time_minutes": 0,
//       "language": "eng",
//       "servings_noun_singular": "serving",
//       "num_servings": 8,
//       "tips_and_ratings_enabled": true,
//       "id": 8485,
//       "total_time_minutes": 10,
//       "seo_title": "Provided by SOCIAL TEAM on FINAL e-mail",
//       "yields": "Servings: 8",
//       "name": "Caramel Apple Cream Cheese Board",
//       "created_at": 1664399899,
//       "thumbnail_alt_text": "",
//       "instructions": [
//         {
//           "temperature": null,
//           "id": 73314,
//           "position": 1,
//           "display_text": "In a small bowl, mix together the cream cheese and caramel sauce until well-combined.",
//           "start_time": 2000,
//           "appliance": null,
//           "end_time": 3183
//         },
//         {
//           "id": 73315,
//           "position": 2,
//           "display_text": "Use a butter knife or offset spatula to spread the cream cheese mixture in a thin layer across a board. Drizzle with more caramel sauce and sprinkle with the peanuts and toffee candy.",
//           "start_time": 4016,
//           "appliance": null,
//           "end_time": 11700,
//           "temperature": null
//         },
//         {
//           "temperature": null,
//           "id": 73316,
//           "position": 3,
//           "display_text": "Serve with apple slices.",
//           "start_time": 0,
//           "appliance": null,
//           "end_time": 0
//         },
//         {
//           "start_time": 16000,
//           "appliance": null,
//           "end_time": 22166,
//           "temperature": null,
//           "id": 73317,
//           "position": 4,
//           "display_text": "Enjoy!"
//         }
//       ],
//       "keywords": "",
//       "facebook_posts": [],
//       "brand": null,
//       "slug": "caramel-apple-cream-cheese-board",
//       "credits": [
//         {
//           "name": "Katie Aubin",
//           "type": "internal"
//         }
//       ],
//       "total_time_tier": {
//         "tier": "under_15_minutes",
//         "display_tier": "Under 15 minutes"
//       },
//       "canonical_id": "recipe:8485"
//     }
//   ]
// })

// const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

const onYeetClick = () => {
  isLoading.value = true
  fetch("/api/recipes")
    .then((res) => res.json())
    .catch((err) => console.log(err))
    .then((data) => {
      recipes.value = data.results;
      randomRecipe.value =
        recipes.value[Math.floor(Math.random() * recipes.value.length)];
      isLoading.value = false
    });
};
</script>

<style scoped lang="scss">
div.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #333;
  text-align: center;
  gap: 10px;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 15px;
  }

  p {
    margin: 0px;
  }
}

div.yeet {
  margin-top: 2rem;
  padding: 20px;

  button {
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 1rem 2rem;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      background-color: #555;
    }
  }
}


.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;

  &__spinner {
    border: 16px solid var(--gray);
    border-top: 16px solid var(--green);
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
