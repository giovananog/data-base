package br.com.unifalmg.hotel.service;

import br.com.unifalmg.hotel.entity.Guest;
import br.com.unifalmg.hotel.exception.GuestNotFoundException;
import br.com.unifalmg.hotel.repository.GuestRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class GuestService {

    private final GuestRepository repository;

    public List<Guest> getAllGuests() {
        return repository.findAll();
    }

    public Guest findById(Integer id){
        if(Objects.isNull(id)){
            throw new IllegalArgumentException("Null ID when fetching for a guest.");
        }
        return repository.findById(id).orElseThrow(
                () -> new GuestNotFoundException(String.format("No guest found for id %d", id))
        );
    }

    public void saveGuest(Guest guest) {
        repository.save(guest);
    }


    public void deleteById(Integer id) {
        if (!Objects.isNull(findById(id))) {
              repository.deleteById(id); // se entrar, guest existe e será deletado
        }
        if(id == null){
            throw new IllegalArgumentException("Null id!");
        }
    }

    public List<Guest> findByFilter(String name, String last_name, String cpf, Character gender){
        if(name == null && last_name == null && cpf == null && gender == null){
            throw new IllegalArgumentException("Tried to filter without a filter param.");
        }
        return repository.findByFilter(name, last_name, cpf, gender);
    }

    public List<Guest> orderGuestsAtoZ() {
        return repository.orderGuestsAtoZ();
    }

    public List<Guest> orderGuestsZtoA() {
        return repository.orderGuestsZtoA();
    }

    public List<Object[]> guestAndReservation(Integer guest_id){
        return repository.selectGuestAndYoursReservationsByGuestId(guest_id);
    }

    public List<Object[]> GuestAndReservationByLodgingId(Integer id){
        return repository.selectGuestAndReservationByLodgingId(id);
    }

    public List<Object[]> findGuestsWithHighestExpenses(){
        return repository.findGuestsWithHighestExpenses();
    }

    public List<Object[]> findGuestsWithLowestExpenses(){
        return repository.findGuestsWithLowestExpenses();
    }

    public List<Object[]> AvgPriceByGuest(){
        return repository.AvgPriceByGuest();
    }
}
