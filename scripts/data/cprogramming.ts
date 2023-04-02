import { Repo } from ".";

export const cprogrammingRepo: Repo = {
	label: "C Programming",
	url: "https://github.com/p21nc3/Junk_Code_Repository/tree/main/C%20programming",
	files: [
		{
			path: "/Junk_Code_Repository/tree/main/C%20programming/freezer.c",
			code: `
            bool __refrigerator(bool check_kthr_stop)
            {
                unsigned int state = get_current_state();
                bool was_frozen = false;
            
                pr_debug("%s entered refrigerator\n", current->comm);
            
                WARN_ON_ONCE(state && !(state & TASK_NORMAL));
            
                for (;;) {
                    bool freeze;
            
                    set_current_state(TASK_FROZEN);
            
                    spin_lock_irq(&freezer_lock);
                    freeze = freezing(current) && !(check_kthr_stop && kthread_should_stop());
                    spin_unlock_irq(&freezer_lock);
            
                    if (!freeze)
                        break;
            
                    was_frozen = true;
                    schedule();
                }
                __set_current_state(TASK_RUNNING);
            
                pr_debug("%s left refrigerator\n", current->comm);
            
                return was_frozen;
            }
            EXPORT_SYMBOL(__refrigerator);
            
            static void fake_signal_wake_up(struct task_struct *p)
            {
                unsigned long flags;
            
                if (lock_task_sighand(p, &flags)) {
                    signal_wake_up(p, 0);
                    unlock_task_sighand(p, &flags);
                }
            }
`
		},
		{
			path: "/Junk_Code_Repository/tree/main/C%20programming/M0003.c",
			code:
				`
                #include <stdio.h>
                #include <ctype.h>
                #include <string.h>
                
                int main() {
                    int freq[10] = {0};
                    char num[1000];
                    fgets(num, sizeof(num), stdin);
                
                    for (int i = 0; i < strlen(num); i++)
                        if (isdigit(num[i]))
                            freq[num[i] - '0']++;
                    
                    for (int i = 0; i < 10; i++)
                        printf("%d ", freq[i]);
                
                    return 0;
                }           
`
		},
		{
			path: "/Junk_Code_Repository/tree/main/C%20programming/M0002.c",
			code:
				`
                #include <stdio.h>
                #include <stdlib.h>
                
                int* total_number_of_books;
                int** total_number_of_pages;
                
                int main()
                {
                    int total_number_of_shelves;
                    scanf("%d", &total_number_of_shelves);
                    
                    int total_number_of_queries;
                    scanf("%d", &total_number_of_queries);
                
                    // Allocate memory
                    total_number_of_books = (int*)malloc(total_number_of_shelves * sizeof(int));
                    total_number_of_pages = (int**)malloc(total_number_of_shelves * sizeof(int*));
                    
                    while (total_number_of_queries--) {
                        int type_of_query;
                        scanf("%d", &type_of_query);
                        
                        if (type_of_query == 1) {
                            int x, y;
                            scanf("%d %d", &x, &y);
                            // Update values
                            total_number_of_books[x]++;
                            total_number_of_pages[x] = realloc(total_number_of_pages[x], total_number_of_books[x] * sizeof(int));
                            total_number_of_pages[x][total_number_of_books[x] - 1] = y;
                        } else if (type_of_query == 2) {
                            int x, y;
                            scanf("%d %d", &x, &y);
                            printf("%d\n", *(*(total_number_of_pages + x) + y));
                        } else {
                            int x;
                            scanf("%d", &x);
                            printf("%d\n", *(total_number_of_books + x));
                        }
                    }
                
                    if (total_number_of_books) {
                        free(total_number_of_books);
                    }
                    
                    for (int i = 0; i < total_number_of_shelves; i++) {
                        if (*(total_number_of_pages + i)) {
                            free(*(total_number_of_pages + i));
                        }
                    }
                    
                    if (total_number_of_pages) {
                        free(total_number_of_pages);
                    }
                    
                    return 0;
                }
`
		},
		{
			path: "/Junk_Code_Repository/tree/main/C%20programming/M0001.c",
			code:
				`
                int sum(int count, ...) {
                    int n = 0;
                    va_list ap;
                    va_start(ap, count);
                    for (int i = 0; i < count; i++)
                        n += va_arg(ap, int);
                    va_end(ap);
                    return n;
                }
                
                int min(int count, ...) {
                    int curr, n = MAX_ELEMENT;
                    va_list ap;
                    va_start(ap, count);
                    for (int i = 0; i < count; i++) {
                        curr = va_arg(ap, int);
                        if (curr < n)
                            n = curr;
                    }
                    va_end(ap);
                    return n;
                }
                
                int max(int count, ...) {
                    int curr, n = MIN_ELEMENT;
                    va_list ap;
                    va_start(ap, count);
                    for (int i = 0; i < count; i++) {
                        curr = va_arg(ap, int);
                        if (curr > n)
                            n = curr;
                    }
                    va_end(ap);
                    return n;
                }
`
		},
		{
			path: "/Junk_Code_Repository/tree/main/C%20programming/rstat.c",
			code:
				`
                void cgroup_rstat_updated(struct cgroup *cgrp, int cpu)
                {
                    raw_spinlock_t *cpu_lock = per_cpu_ptr(&cgroup_rstat_cpu_lock, cpu);
                    unsigned long flags;
                    if (data_race(cgroup_rstat_cpu(cgrp, cpu)->updated_next))
                        return;
                
                
                raw_spin_lock_irqsave(cpu_lock, flags);
                while (true) {
                    struct cgroup_rstat_cpu *rstatc = cgroup_rstat_cpu(cgrp, cpu);
                    struct cgroup *parent = cgroup_parent(cgrp);
                    struct cgroup_rstat_cpu *prstatc;
                    if (rstatc->updated_next)
                        break;
                    if (!parent) {
                        rstatc->updated_next = cgrp;
                        break;
                    }
                
                prstatc = cgroup_rstat_cpu(parent, cpu);
                rstatc->updated_next = prstatc->updated_children;
                prstatc->updated_children = cgrp;
                cgrp = parent;
                }
                raw_spin_unlock_irqrestore(cpu_lock, flags);
                }
                
                static void cgroup_rstat_flush_locked(struct cgroup *cgrp, bool may_sleep)
                    __releases(&cgroup_rstat_lock) __acquires(&cgroup_rstat_lock)
                {
                    int cpu;
                    lockdep_assert_held(&cgroup_rstat_lock);
                    for_each_possible_cpu(cpu) {
                        raw_spinlock_t *cpu_lock = per_cpu_ptr(&cgroup_rstat_cpu_lock,
                                               cpu);
                        struct cgroup *pos = NULL;
                        unsigned long flags;
                        raw_spin_lock_irqsave(cpu_lock, flags);
                        while ((pos = cgroup_rstat_cpu_pop_updated(pos, cgrp, cpu))) {
                            struct cgroup_subsys_state *css;
                            cgroup_base_stat_flush(pos, cpu);
                            bpf_rstat_flush(pos, cgroup_parent(pos), cpu);
                            rcu_read_lock();
                            list_for_each_entry_rcu(css, &pos->rstat_css_list,
                                        rstat_css_node)
                                css->ss->css_rstat_flush(css, cpu);
                            rcu_read_unlock();
                        }
                        raw_spin_unlock_irqrestore(cpu_lock, flags);
                        /* if @may_sleep, play nice and yield if necessary */
                        if (may_sleep && (need_resched() ||
                                  spin_needbreak(&cgroup_rstat_lock))) {
                            spin_unlock_irq(&cgroup_rstat_lock);
                            if (!cond_resched())
                                cpu_relax();
                            spin_lock_irq(&cgroup_rstat_lock);
                        }
                    }
                }
`
		}
	]
}
