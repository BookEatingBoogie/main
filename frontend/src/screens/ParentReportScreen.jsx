import React from 'react';
 import { useRecoilValue } from 'recoil';
 import { storyInfoState } from '../recoil/atoms';
 import CategoryStatsChart from '../components/CategoryStatsChart';
 import BaseScreenLayout from '../components/BaseScreenLayout';
 
 const categories = ['genre', 'place', 'mood'];
 const categoryNames = {
   genre: '장르',
   place: '장소',
   mood: '날씨',
 };
 
 function countFrequencies(storyInfo, categoryKey) {
   const freq = {};
   storyInfo.forEach(story => {
     const val = story[categoryKey];
     if (val) {
       freq[val] = (freq[val] || 0) + 1;
     }
   });
   return freq;
 }
 
 const ParentReportScreen = () => {
   const storyInfo = useRecoilValue(storyInfoState);
 
   return (
     <BaseScreenLayout
       title="부모 리포트"
       subTitle="아이의 선택 경향을 카테고리별로 확인해보세요."
     >
       {categories.map(key => (
         <CategoryStatsChart
           key={key}
           title={`${categoryNames[key]} 통계`}
           data={countFrequencies(storyInfo, key)}
         />
       ))}
     </BaseScreenLayout>
   );
 };
 
 export default ParentReportScreen;