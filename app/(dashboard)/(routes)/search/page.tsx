import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";
import { WidgetChatBot } from "@/components/widget-chatbot";
import axios from "axios";
import { getCoursesRecommend } from "@/actions/get-courses-recommend";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  const coursesRecommend = async () => {
    try {
      //Call api python
      const getIds = await axios.get(`${process.env.NEXT_PUBLIC_URL_MOCK_DB}/recommend-courses`);
      const items = getIds.data.items;
      let recourses: any[] = [];

      const promises = items.map(async (item: any) => {
        const getRecourses = await getCoursesRecommend({
          userId,
          courseId: item.id,
        });

        if (getRecourses.length > 0) {
          recourses = [...recourses, ...getRecourses];
        }
      });

      await Promise.all(promises);
      return recourses;
    }
    catch (error) {
      console.log(`[search/page]: ${error}`);
    }
  };

  //Action catch courses
  console.log(await coursesRecommend());

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories
          items={categories}
        />
        <CoursesList items={courses} />
      </div>
      <WidgetChatBot />
    </>
  );
}

export default SearchPage;