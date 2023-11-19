export interface RobotStructure {
  _id: string;
  name: string;
  movie: string;
  speed: number;
  endurance: number;
  image: string;
}

export interface RobotsRepository {
  getRobots: () => Promise<RobotStructure[]>;
}
