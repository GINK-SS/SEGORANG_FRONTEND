import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BoardItemInfo } from '../../types/board';
import changeDate from '../../utils/changeDate';

interface BoardItemProps {
  hasCategory: boolean;
  post: BoardItemInfo;
  link: string;
}

const BoardItem = ({ hasCategory, post, link }: BoardItemProps) => {
  return (
    <Item>
      <Type hasCategory={hasCategory}>{post.category}</Type>
      <LikeNum>{post.like_num}</LikeNum>
      <Link to={link}>
        <Title>
          {post.post_title.length > 50
            ? `${post.post_title.slice(0, 50)}…`
            : post.post_title}
          <CommentNum>{`[${post.comment_num}]`}</CommentNum>
        </Title>
      </Link>
      <Writer>{post.writer}</Writer>
      <ViewNum>{post.view_num ?? 0}</ViewNum>
      <Date isNew={changeDate(post.created_at).includes('분 전')}>
        {changeDate(post.created_at)}
      </Date>
    </Item>
  );
};

export default BoardItem;

const Item = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 15px;

  &:hover {
    background-color: #f2f2f2;
  }

  span,
  a {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  a {
    flex: 1;
    color: #000;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.sejongCrimsonRed};
    }
  }
`;

const Type = styled.span<{ hasCategory: boolean }>`
  display: ${({ hasCategory }) => (hasCategory ? 'block' : 'none')};
  width: 90px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const LikeNum = styled.span`
  width: 60px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Title = styled.span`
  flex: 1;
  padding-left: 10px;
`;

const CommentNum = styled.span`
  margin-left: 5px;
  color: ${({ theme }) => theme.accentColor};
`;

const Writer = styled.span`
  padding-right: 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  text-align: end;
  color: rgba(0, 0, 0, 0.8);
`;

const ViewNum = styled.span`
  width: 60px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Date = styled.span<{ isNew: boolean }>`
  width: 80px;
  text-align: center;
  font-weight: 600;
  color: ${({ isNew, theme }) => (isNew ? theme.accentColor : 'rgba(0, 0, 0, 0.5)')};
`;
