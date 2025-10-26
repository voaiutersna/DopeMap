export type Roadmap = {
  id: string;
  title: string;
  description: string;
  authorId: number;
  enrolled: boolean;
  created_at: string;
  is_public: boolean;
};

export type HistoryType = {
  id: string;
  roadmap_id: string;
  roadmap_title: string;
  roadmap_description: string;
  enrolled_at: string;
};