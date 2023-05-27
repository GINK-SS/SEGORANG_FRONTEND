import WeeklyTopItem from '../../components/main/aside/WeeklyTopItem';
import WeeklyTopOption from '../../components/main/aside/WeeklyTopOption';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TopItem } from '../../types/main';

const WeeklyTop = () => {
  const [viewList, setViewList] = useState<TopItem[]>();
  const [recommendList, setRecommendList] = useState<TopItem[]>();
  const [isView, setIsView] = useState(true);
  const history = useHistory();

  const onView = () => setIsView(true);
  const onRecommend = () => setIsView(false);

  const onPost = (boardTitle: string, postId: number) =>
    history.push(`/post/${postId}?boardTitle=${boardTitle}`);

  return (
    <>
      <WeeklyTopOption isView={isView} onView={onView} onRecommend={onRecommend} />

      <ul>
        {isView
          ? viewList?.map((value, index) => (
              <WeeklyTopItem
                key={index}
                title={value.title}
                index={index}
                onPost={() => onPost(value.boardTitle, value.postId)}
              />
            ))
          : recommendList?.map((value, index) => (
              <WeeklyTopItem
                key={index}
                title={value.title}
                index={index}
                onPost={() => onPost(value.boardTitle, value.postId)}
              />
            ))}
      </ul>
    </>
  );
};

export default WeeklyTop;
