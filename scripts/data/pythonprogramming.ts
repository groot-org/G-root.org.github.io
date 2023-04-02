import { Repo } from ".";

export const pythonprogrammingRepo: Repo = {
	label: "Python Programming",
	url: "https://github.com/p21nc3/Junk_Code_Repository/tree/main/Python%20Programming",
	files: [
		{
			path: "/Junk_Code_Repository/tree/main/Python%20Programming/connectfour_ai.py",
			code: `
            def get_player_move() -> Move:
            player_move: Move = Move(-1)
            while player_move not in board.legal_moves:
                play: int = int(input("Enter a legal column (0-6):"))
                player_move = Move(play)
            return player_move
        
        
        if __name__ == "__main__":
            # main game loop
            while True:
                human_move: Move = get_player_move()
                board = board.move(human_move)
                if board.is_win:
                    print("Human wins!")
                    break
                elif board.is_draw:
                    print("Draw!")
                    break
                computer_move: Move = find_best_move(board, 5)
                print(f"Computer move is {computer_move}")
                board = board.move(computer_move)
                print(board)
                if board.is_win:
                    print("Computer wins!")
                    break
                elif board.is_draw:
                    print("Draw!")
                    break`
		},
		{
			path: "/Junk_Code_Repository/tree/main/Python%20Programming/dna_search.py",
			code:
				`
                def string_to_gene(s: str) -> Gene:
                gene: Gene = []
                for i in range(0, len(s), 3):
                    if (i + 2) >= len(s):  # don't run off end!
                        return gene
                    #  initialize codon out of three nucleotides
                    codon: Codon = (Nucleotide[s[i]], Nucleotide[s[i + 1]], Nucleotide[s[i + 2]])
                    gene.append(codon)  # add codon to gene
                return gene
            
            
            my_gene: Gene = string_to_gene(gene_str)
            
            
            def linear_contains(gene: Gene, key_codon: Codon) -> bool:
                for codon in gene:
                    if codon == key_codon:
                        return True
                return False
            
            
            acg: Codon = (Nucleotide.A, Nucleotide.C, Nucleotide.G)
            gat: Codon = (Nucleotide.G, Nucleotide.A, Nucleotide.T)
            print(linear_contains(my_gene, acg))  # True
            print(linear_contains(my_gene, gat))  # False
            
            
            def binary_contains(gene: Gene, key_codon: Codon) -> bool:
                low: int = 0
                high: int = len(gene) - 1
                while low <= high:  # while there is still a search space
                    mid: int = (low + high) // 2
                    if gene[mid] < key_codon:
                        low = mid + 1
                    elif gene[mid] > key_codon:
                        high = mid - 1
                    else:
                        return True
                return False
`
		},
		{
			path: "/Junk_Code_Repository/tree/main/Python%20Programming/minimax.py",
			code:
				`
                def alphabeta(board: Board, maximizing: bool, original_player: Piece, max_depth: int = 8, alpha: float = float("-inf"), beta: float = float("inf")) -> float:
                # Base case – terminal position or maximum depth reached
                if board.is_win or board.is_draw or max_depth == 0:
                    return board.evaluate(original_player)
            
                # Recursive case - maximize your gains or minimize the opponent's gains
                if maximizing:
                    for move in board.legal_moves:
                        result: float = alphabeta(board.move(move), False, original_player, max_depth - 1, alpha, beta)
                        alpha = max(result, alpha)
                        if beta <= alpha:
                            break
                    return alpha
                else:  # minimizing
                    for move in board.legal_moves:
                        result = alphabeta(board.move(move), True, original_player, max_depth - 1, alpha, beta)
                        beta = min(result, beta)
                        if beta <= alpha:
                            break
                    return beta
`
		},
		{
			path: "/Junk_Code_Repository/tree/main/Python%20Programming/missionaries.py",
			code:
				`
                from __future__ import annotations
                from typing import List, Optional
                from generic_search import bfs, Node, node_to_path
                
                MAX_NUM: int = 3
                
                
                class MCState:
                    def __init__(self, missionaries: int, cannibals: int, boat: bool) -> None:
                        self.wm: int = missionaries # west bank missionaries
                        self.wc: int = cannibals # west bank cannibals
                        self.em: int = MAX_NUM - self.wm  # east bank missionaries
                        self.ec: int = MAX_NUM - self.wc  # east bank cannibals
                        self.boat: bool = boat
                
                    def __str__(self) -> str:
                        return ("On the west bank there are {} missionaries and {} cannibals.\n" 
                                "On the east bank there are {} missionaries and {} cannibals.\n"
                                "The boat is on the {} bank.")\
                            .format(self.wm, self.wc, self.em, self.ec, ("west" if self.boat else "east"))
                
                    def goal_test(self) -> bool:
                        return self.is_legal and self.em == MAX_NUM and self.ec == MAX_NUM
                
                    @property
                    def is_legal(self) -> bool:
                        if self.wm < self.wc and self.wm > 0:
                            return False
                        if self.em < self.ec and self.em > 0:
                            return False
                        return True
                
                    def successors(self) -> List[MCState]:
                        sucs: List[MCState] = []
                        if self.boat: # boat on west bank
                            if self.wm > 1:
                                sucs.append(MCState(self.wm - 2, self.wc, not self.boat))
                            if self.wm > 0:
                                sucs.append(MCState(self.wm - 1, self.wc, not self.boat))
                            if self.wc > 1:
                                sucs.append(MCState(self.wm, self.wc - 2, not self.boat))
                            if self.wc > 0:
                                sucs.append(MCState(self.wm, self.wc - 1, not self.boat))
                            if (self.wc > 0) and (self.wm > 0):
                                sucs.append(MCState(self.wm - 1, self.wc - 1, not self.boat))
                        else: # boat on east bank
                            if self.em > 1:
                                sucs.append(MCState(self.wm + 2, self.wc, not self.boat))
                            if self.em > 0:
                                sucs.append(MCState(self.wm + 1, self.wc, not self.boat))
                            if self.ec > 1:
                                sucs.append(MCState(self.wm, self.wc + 2, not self.boat))
                            if self.ec > 0:
                                sucs.append(MCState(self.wm, self.wc + 1, not self.boat))
                            if (self.ec > 0) and (self.em > 0):
                                sucs.append(MCState(self.wm + 1, self.wc + 1, not self.boat))
                        return [x for x in sucs if x.is_legal]
`
		},
		{
			path: "/Junk_Code_Repository/tree/main/Python%20Programming/weighted_graph.py",
			code:
				`
                from typing import TypeVar, Generic, List, Tuple
                from graph import Graph
                from weighted_edge import WeightedEdge
                
                V = TypeVar('V') # type of the vertices in the graph
                
                
                class WeightedGraph(Generic[V], Graph[V]):
                    def __init__(self, vertices: List[V] = []) -> None:
                        self._vertices: List[V] = vertices
                        self._edges: List[List[WeightedEdge]] = [[] for _ in vertices]
                
                    def add_edge_by_indices(self, u: int, v: int, weight: float) -> None:
                        edge: WeightedEdge = WeightedEdge(u, v, weight)
                        self.add_edge(edge) # call superclass version
                
                    def add_edge_by_vertices(self, first: V, second: V, weight: float) -> None:
                        u: int = self._vertices.index(first)
                        v: int = self._vertices.index(second)
                        self.add_edge_by_indices(u, v, weight)
                
                    def neighbors_for_index_with_weights(self, index: int) -> List[Tuple[V, float]]:
                        distance_tuples: List[Tuple[V, float]] = []
                        for edge in self.edges_for_index(index):
                            distance_tuples.append((self.vertex_at(edge.v), edge.weight))
                        return distance_tuples
                
                    def __str__(self) -> str:
                        desc: str = ""
                        for i in range(self.vertex_count):
                            desc += f"{self.vertex_at(i)} -> {self.neighbors_for_index_with_weights(i)}\n"
                        return desc
`
		}
	]
}
